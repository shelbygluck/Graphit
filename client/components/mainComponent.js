import React, {Component} from 'react'
import {connect} from 'react-redux'
import {columnData} from '../store/data'
import html2canvas from 'html2canvas'
import BarGraphComponent from './bar'
import PieChartComponent from './pie'
import LineChart from './line'
import Scatterplot from './scatterplots'

class MainComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }

    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.prevButtonDisabled = this.prevButtonDisabled.bind(this)
    this.nextButtonDisabled = this.nextButtonDisabled.bind(this)
  }

  next() {
    let newCounter = this.state.counter + 1
    this.setState({
      counter: newCounter
    })
    console.log('NEXT', this.state.counter)
  }

  prev() {
    let newCounter = this.state.counter - 1
    this.setState({
      counter: newCounter
    })
    console.log('PREV', this.state.counter)
  }

  prevButtonDisabled() {
    if (this.state.counter === 0) {
      return true
    }
    return false
  }

  nextButtonDisabled() {
    if (this.state.counter === this.props.graph.type.length - 1) {
      return true
    }
    return false
  }

  render() {
    return (
      <div className="carousel">
        <div className="prevButton">
          <button
            type="button"
            className="carouselButton"
            onClick={this.prev}
            disabled={this.prevButtonDisabled()}
          >
            &#8249;
          </button>
        </div>

        <div className="chosenGraph">
          {this.props.graph.type[this.state.counter] === 'pie' ? (
            <PieChartComponent />
          ) : this.props.graph.type[this.state.counter] === 'bar' ? (
            <BarGraphComponent />
          ) : this.props.graph.type[this.state.counter] === 'line' ? (
            <LineChart />
          ) : this.props.graph.type[this.state.counter] === 'scatter' ? (
            <Scatterplot />
          ) : (
            <div />
          )}
        </div>

        <div className="nextButton">
          <button
            className="carouselButton"
            type="button"
            onClick={this.next}
            disabled={this.nextButtonDisabled()}
          >
            &#8250;
          </button>
        </div>
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
