import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Pie} from 'react-chartjs-2'
import DownloadButton from './downloadButton'

export class PieChartComponent extends Component {
  constructor() {
    super()
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
      <div className={this.props.fullscreen && 'fullscreen'}>
        <div className={this.props.fullscreen ? 'graph printPDF' : 'graph'}>
          <h2>{title}</h2>
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
        </div>
        {this.props.fullscreen && <DownloadButton />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps, null)(PieChartComponent)
