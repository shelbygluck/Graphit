import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {columnData} from '../store/data'
import {Pie} from 'react-chartjs-2'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')
import SaveGraph from './save-graph'

export class PieChartComponent extends Component {
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
    let labels = this.props.graph.data[this.props.graph.columns[1]]
    let data = this.props.graph.data[this.props.graph.columns[0]]
    let title = `${this.props.graph.columns[0]} broken down by ${
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
          <h1>{title}</h1>
          <Pie
            data={{
              labels: labels,
              datasets: [
                {
                  data: data,
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
                  ],
                  options: {
                    title: {
                      display: true,
                      text: 'Custom Chart Title'
                    }
                  }
                }
              ]
            }}
            height={100}
          />
          <br />
        </div>

        <div className="saveButtons">
          <button
            className="saveBtn"
            type="button"
            onClick={() => this.saveAsPDF()}
          >
            Save as PDF
          </button>
          <button
            className="saveBtn"
            type="button"
            onClick={() => this.saveGraph()}
          >
            Save This Graph
          </button>
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

export default connect(mapStateToProps, null)(PieChartComponent)
