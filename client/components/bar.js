import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import {connect} from 'react-redux'
import DownloadButton from './downloadButton'

export class BarGraphComponent extends Component {
  constructor() {
    super()
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
      <div className={this.props.fullscreen && 'fullscreen'}>
        <div className={this.props.fullscreen ? 'graph printPDF' : 'graph'}>
          <h2>{title}</h2>
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
        </div>
        {this.props.fullscreen && <DownloadButton />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps, null)(BarGraphComponent)
