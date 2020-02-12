import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleChart} from '../store/savedChart'
import store from '../store'
import html2canvas from 'html2canvas'
import BarGraphComponent from './bar'
import PieChartComponent from './pie'
import LineChart from './line'
import Scatterplot from './scatterplots'

class SingleChart extends React.Component {
  componentDidMount() {
    this.props.getSingleChart()
  }

  render() {
    console.log('SINGLE PROPS', this.props)
    // console.log("HERE", this.props.location.match.params.id)
    return (
      // <div className="carousel">
      <div>
        {/* <div className="chosenGraph"> */}
        <div>
          {this.props.graph.type[0] === 'pie' ? (
            <PieChartComponent
              avg={false}
              graphtype={this.props.graph.type[0]}
              name={this.props.graph.name}
            />
          ) : this.props.graph.type[0] === 'avg-pie' ? (
            <PieChartComponent
              avg={true}
              graphtype={this.props.graph.type[0]}
              type={this.props.graphtype}
            />
          ) : this.props.graph.type[0] === 'bar' ? (
            <BarGraphComponent
              avg={false}
              graphtype={this.props.graph.type[0]}
              type={this.props.graphtype}
            />
          ) : this.props.graph.type[0] === 'avg-bar' ? (
            <BarGraphComponent
              avg={true}
              graphtype={this.props.graph.type[0]}
              type={this.props.graphtype}
            />
          ) : this.props.graph.type[0] === 'line' ? (
            <LineChart
              avg={false}
              graphtype={this.props.graph.type[0]}
              type={this.props.graphtype}
            />
          ) : this.props.graph.type[0] === 'avg-line' ? (
            <LineChart
              avg={true}
              graphtype={this.props.graph.type[0]}
              type={this.props.graphtype}
            />
          ) : this.props.graph.type[0] === 'scatter' ? (
            <Scatterplot
              graphtype={this.props.graph.type[0]}
              type={this.props.graphtype}
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
  savedChart: state.savedChart,
  graph: state.graph
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSingleChart: function() {
      const chartId = ownProps.match.params.id
      const thunk = getSingleChart(chartId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleChart)
