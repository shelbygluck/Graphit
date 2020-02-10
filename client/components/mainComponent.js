import React, {Component} from 'react'
import {connect} from 'react-redux'
import {columnData} from '../store/data'
import html2canvas from 'html2canvas'
import BarGraphComponent from './bar'
import PieChartComponent from './pie'
import LineChart from './line'
import ScatterPlot, {Scatterplot} from './scatterplots'

export default class MainComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      type: ['pie', 'bar'],
      columnData: {
        column1: ['1', '2'],
        column2: ['bla bla', 'bla bla bla']
      },
      counter: 0
    }
  }
  render() {
    return (
      <div>
        <div>
          {this.state.type[0] === 'pie' ? (
            <PieChartComponent />
          ) : this.state.type[0] === 'bar' ? (
            <BarGraphComponent />
          ) : this.state.type[0] === 'line' ? (
            <LineChart />
          ) : this.state.type[0] === 'scatter' ? (
            <Scatterplot />
          ) : (
            <div />
          )}
        </div>
        <br />
        <div>
          {this.state.type[1] === 'pie' ? (
            <PieChartComponent />
          ) : this.state.type[1] === 'bar' ? (
            <BarGraphComponent />
          ) : this.state.type[1] === 'line' ? (
            <LineChart />
          ) : this.state.type[1] === 'scatter' ? (
            <Scatterplot />
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}
