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
            <PieChartComponent />
          ) : this.props.graph.type[0] === 'bar' ? (
            <BarGraphComponent />
          ) : this.props.graph.type[0] === 'line' ? (
            <LineChart />
          ) : this.props.graph.type[0] === 'scatter' ? (
            <Scatterplot />
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
