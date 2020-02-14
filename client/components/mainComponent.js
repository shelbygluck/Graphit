import React, {Component} from 'react'
import {connect} from 'react-redux'
import {columnData} from '../store/data'
import html2canvas from 'html2canvas'
import BarGraphComponent from './bar'
import PieChartComponent from './pie'
import LineChart from './line'
import Scatterplot from './scatterplots'
import {Grid} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faChevronCircleRight,
  faChevronCircleLeft
} from '@fortawesome/free-solid-svg-icons'

class MainComponent extends Component {
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
  }

  prev() {
    let newCounter = this.state.counter - 1
    this.setState({
      counter: newCounter
    })
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
      <Grid
        className="carousel"
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <button
            type="button"
            className="carouselButton"
            onClick={this.prev}
            disabled={this.prevButtonDisabled()}
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </button>
        </Grid>

        <Grid item className="chosenGraph">
          {this.props.graph.type[this.state.counter] === 'pie' ? (
            <PieChartComponent
              avg={false}
              graphtype={this.props.graph.type[this.state.counter]}
            />
          ) : this.props.graph.type[this.state.counter] === 'avg-pie' ? (
            <PieChartComponent
              avg={true}
              graphtype={this.props.graph.type[this.state.counter]}
            />
          ) : this.props.graph.type[this.state.counter] === 'bar' ? (
            <BarGraphComponent
              avg={false}
              graphtype={this.props.graph.type[this.state.counter]}
            />
          ) : this.props.graph.type[this.state.counter] === 'avg-bar' ? (
            <BarGraphComponent
              avg={true}
              graphtype={this.props.graph.type[this.state.counter]}
            />
          ) : this.props.graph.type[this.state.counter] === 'line' ? (
            <LineChart
              avg={false}
              graphtype={this.props.graph.type[this.state.counter]}
            />
          ) : this.props.graph.type[this.state.counter] === 'avg-line' ? (
            <LineChart
              avg={true}
              graphtype={this.props.graph.type[this.state.counter]}
            />
          ) : this.props.graph.type[this.state.counter] === 'scatter' ? (
            <Scatterplot
              graphtype={this.props.graph.type[this.state.counter]}
            />
          ) : (
            <p>Could not find the appropriate graph from given data</p>
          )}
        </Grid>
        <Grid item>
          <button
            className="carouselButton"
            type="button"
            onClick={this.next}
            disabled={this.nextButtonDisabled()}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </button>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps, null)(MainComponent)
