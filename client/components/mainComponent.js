import React, {Component} from 'react'
import {connect} from 'react-redux'
import {columnData} from '../store/data'
import html2canvas from 'html2canvas'
import BarGraphComponent from './bar'
import PieChartComponent from './pie'
import LineChart from './line'
import ScatterPlot, {Scatterplot} from './scatterplots'

class MainComponent extends React.Component {
  render() {
    console.log('PROPPIEZ', this.props)
    return (
      <div>
        {this.props.graph.type[0] ? (
          <div>
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
            <br />
            <div>
              {this.props.graph.type[1] === 'pie' ? (
                <PieChartComponent />
              ) : this.props.graph.type[1] === 'bar' ? (
                <BarGraphComponent />
              ) : this.props.graph.type[1] === 'line' ? (
                <LineChart />
              ) : this.props.graphtype[1] === 'scatter' ? (
                <Scatterplot />
              ) : (
                <div />
              )}
            </div>
          </div>
        ) : (
          <div>LOADING</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

// const mapDispatchToProps = dispatch => {
//   return {
//     loadColumnData: id => dispatch(scatterData(id))
//   }
// }

export default connect(mapStateToProps, null)(MainComponent)
