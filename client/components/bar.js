import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import {connect} from 'react-redux'
// import {columnData} from '../store/data'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')
import SaveGraph from './save-graph'

export class BarGraphComponent extends Component {
  constructor() {
    super()
    this.state = {
      savedGraph: false
    }
  }

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

  saveGraph() {
    this.setState({
      savedGraph: true
    })
  }

  render() {
    return (
      <div>
        <div className="divToPDF">
          <Bar
            data={{
              labels: this.props.graph.data[this.props.graph.columns[1]],
              datasets: [
                {
                  label: `${this.props.graph.columns[0]}`,
                  backgroundColor: '#fea49f',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: this.props.graph.data[this.props.graph.columns[0]]
                }
              ]
            }}
            height={100}
            options={{
              title: {
                dispaly: true,
                text: 'Average Rainfall Per Month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
          <br />
        </div>
        <div>
          <button onClick={() => this.saveAsPDF()}>Save as PDF</button>
          <button onClick={() => this.saveGraph()}>Save This Graph</button>
          {this.state.savedGraph === true ? (
            <SaveGraph
              type="bar"
              columnData={this.props.graph.data}
              columns={this.props.graph.columns}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps, null)(BarGraphComponent)
