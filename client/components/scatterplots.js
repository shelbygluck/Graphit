import React from 'react'
import {Scatter} from 'react-chartjs-2'
import {connect} from 'react-redux'
import {scatterData} from '../store/data'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')

export class Scatterplot extends React.Component {
  componentDidMount() {
    let userId = this.props.user.id
    this.props.loadColumnData(userId)
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

  render() {
    console.log(this.props, 'props here!!!')
    console.log(typeof this.props.columns, 'COLUMNSSSS')

    return (
      <div>
        <div className="divToPDF">
          <Scatter
            data={{
              labels: 'Scatter Dataset',
              datasets: [
                {
                  label: 'Rainfall',
                  data: this.props.scatterData,
                  backgroundColor: [
                    'maroon',
                    'red',
                    'orange',
                    'yellow',
                    'olive',
                    'green',
                    'blue',
                    'navy',
                    'purple',
                    'fuchsia',
                    'aqua'
                  ]
                }
              ]
            }}
            options={{
              scales: {
                xAxes: [
                  {
                    type: 'linear',
                    position: 'bottom'
                  }
                ]
              }
            }}
          />
        </div>
        <div>
          <button onClick={() => this.saveAsPDF()}>Save as PDF</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  scatterData: state.data.scatterData,
  columns: state.data.columns
})

const mapDispatchToProps = dispatch => {
  return {
    loadColumnData: id => dispatch(scatterData(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scatterplot)
