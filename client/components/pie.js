import React, {Component} from 'react'
import {connect} from 'react-redux'
import {columnData} from '../store/data'
import {Pie} from 'react-chartjs-2'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')

export class PieChartComponent extends Component {
  saveAsPDF() {
    let input = window.document.getElementsByClassName('divToPDF')[0]
    html2canvas(input)
      .then(canvas => {
        console.log(canvas)
        const imgData = canvas.toDataURL('image/png')
        const pdf = new pdfConverter('l', 'pt')
        pdf.addImage(imgData, 'JPEG', 15, 110, 800, 250)
        pdf.save('test.pdf')
      })
      .catch(err => console.log(err.message))
  }

  render() {
    return (
      <div>
        <div className="divToPDF">
          <Pie
            data={{
              labels: this.props.graph.data[this.props.graph.columns[1]],
              datasets: [
                {
                  data: this.props.graph.data[this.props.graph.columns[0]],
                  backgroundColor: [
                    '#161748',
                    '#478559',
                    '#f95d9b',
                    '#39a0ca',
                    '#fea49f',
                    '#fbaf08',
                    '#51d0de',
                    '#bf4aa8',
                    '#c3d7c47',
                    '#e05915',
                    '#5252d4',
                    '#8bf0ba',
                    '#0e0fed',
                    '#94f0f1',
                    '#f2b1d8',
                    '#ffdc6a',
                    '#dcc7aa'
                  ]
                }
              ]
            }}
            height={100}
          />
          <br />
        </div>
        <div>
          <button onClick={() => this.saveAsPDF()}>Save as PDF</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps, null)(PieChartComponent)
