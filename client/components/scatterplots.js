import React from 'react'
import {Scatter} from 'react-chartjs-2'
import {connect} from 'react-redux'
import DownloadButton from './downloadButton'

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
      <div className={this.props.fullscreen && 'fullscreen'}>
        <div className={this.props.fullscreen ? 'graph printPDF' : 'graph'}>
          <h2>{title}</h2>
          <Scatter
            className="chart-js"
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
        {this.props.fullscreen && <DownloadButton />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps)(Scatterplot)
