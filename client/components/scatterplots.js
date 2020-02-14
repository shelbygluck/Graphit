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
  }

  render() {
    let title = `${this.props.graph.columns[0]} vs. ${
      this.props.graph.columns[1]
    }`
    if (this.props.graph.name) {
      title = this.props.graph.name
    }
    return (
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
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps, null)(Scatterplot)
