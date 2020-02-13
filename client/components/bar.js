import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import {connect} from 'react-redux'
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
      title = 'Avgerage ' + title
    }
    if (this.props.graph.name) {
      title = this.props.graph.name
    }
    return (
      <div>
        <div className="divToPDF">
          <h1>{title}</h1>
          <Bar
            data={{
              labels: labels,
              datasets: [
                {
                  label: `${this.props.graph.columns[0]}`,
                  backgroundColor: '#fea49f',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: data
                }
              ]
            }}
            height={100}
            options={{
              legend: {
                display: true,
                position: 'right'
              }
            }}
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

export default connect(mapStateToProps, null)(BarGraphComponent)
