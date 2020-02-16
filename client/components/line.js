import React from 'react'
import {Line} from 'react-chartjs-2'
import {connect} from 'react-redux'
import DownloadButton from './downloadButton'

export class LineChart extends React.Component {
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
        {this.props.fullscreen && <DownloadButton />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps, null)(LineChart)
