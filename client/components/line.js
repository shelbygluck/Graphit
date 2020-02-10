import React from 'react'
import {Line} from 'react-chartjs-2'
import {connect} from 'react-redux'
import {columnData} from '../store/data'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')

// let columns = ['STATE', 'AGE']
// let columnDataa = {
//   STATE: ['OH', 'IN', 'SC', 'OH', 'AR', 'AZ', 'AK', 'WA', 'UT', 'WA'],
//   AGE: ['37', '28', '65', '41', '23', '54', '52', '44', '61', '39']
// }

export class LineChart extends React.Component {
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
    return (
      <div>
        <div className="divToPDF">
          <Line
            data={{
              labels: this.props.columnData[this.props.columns[1]],
              datasets: [
                {
                  label: `${this.props.columns[0]}`,
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: '#478559',
                  borderColor: '#161748',
                  borderWidth: 2,
                  data: this.props.columnData[this.props.columns[0]]
                }
              ]
            }}
            options={{
              title: {
                display: true,
                text: `${this.props.columns[0]} by ${this.props.columns[1]}`,
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
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
  columnData: state.data.columnData,
  columns: state.data.columns
})

const mapDispatchToProps = dispatch => {
  return {
    loadColumnData: id => dispatch(columnData(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart)
