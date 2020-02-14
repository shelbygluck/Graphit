import React from 'react'
import {Scatter} from 'react-chartjs-2'
import {connect} from 'react-redux'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')
import SaveGraph from './save-graph'
import SaveButtons from './saveButtons'

export class Scatterplot extends React.Component {
  constructor() {
    super()
    this.state = {
      savedGraph: false
    }
  }

  saveAsPDF = () => {
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

  saveGraph = () => {
    this.setState({
      savedGraph: true
    })
  }

  render() {
    let title = `${this.props.graph.columns[0]} vs. ${
      this.props.graph.columns[1]
    }`
    if (this.props.graph.name) {
      title = this.props.graph.name
    }
    return (
      <div>
        <div className="divToPDF">
          <h2>{title}</h2>
          <Scatter
            data={{
              labels: 'Scatter Dataset',
              datasets: [
                {
                  label: title,
                  data: this.props.graph.scatterData,
                  backgroundColor: 'navy'
                }
              ]
            }}
            options={{
              scales: {
                xAxes: [
                  {
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                      display: true,
                      labelString: this.props.graph.columns[0]
                    }
                  }
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: this.props.graph.columns[1]
                    }
                  }
                ]
              }
            }}
          />
        </div>
        <div>
          <SaveButtons saveAsPDF={this.saveAsPDF} saveGraph={this.saveGraph} />
          {this.state.savedGraph === true ? (
            <SaveGraph
              type="scatter"
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

export default connect(mapStateToProps, null)(Scatterplot)
