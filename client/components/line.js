import React from 'react'
import {Line} from 'react-chartjs-2'
import {connect} from 'react-redux'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')
import SaveGraph from './save-graph'
import {Link} from 'react-router-dom'
import SaveButtons from './saveButtons'

export class LineChart extends React.Component {
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
    let labels = this.props.graph.data[this.props.graph.columns[1]]
    let data = this.props.graph.data[this.props.graph.columns[0]]
    let title = `${this.props.graph.columns[0]} by ${
      this.props.graph.columns[1]
    }`
    if (this.props.avg === true) {
      labels = this.props.graph.averageCD[this.props.graph.columns[1]]
      data = this.props.graph.averageCD[this.props.graph.columns[0]]
      title = 'Average ' + title
    }
    if (this.props.graph.name) {
      title = this.props.graph.name
    }
    return (
      <div>
        <div className="divToPDF">
          <h2>{title}</h2>
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: `${this.props.graph.columns[0]}`,
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: '#478559',
                  borderColor: '#161748',
                  borderWidth: 2,
                  data: data
                }
              ]
            }}
            options={{
              title: {
                display: true,
                text: title,
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
        <div className="saveButtons">
          <SaveButtons saveAsPDF={this.saveAsPDF} saveGraph={this.saveGraph} />
          {this.state.savedGraph === true ? (
            <SaveGraph
              type={this.props.graphtype}
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

export default connect(mapStateToProps, null)(LineChart)
