import React, {Component} from 'react'
import {Doughnut} from 'react-chartjs-2'

class DoughnutChartComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: ['under 18', 'age 18-54', 'age 55+'],
      datasets: [
        {
          data: [8000, 4000, 2850],
          backgroundColor: ['red', 'blue', 'green']
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Age Breakdown Chart</h1>
        <Doughnut
          data={{
            labels: this.state.labels,
            datasets: this.state.datasets
          }}
          height={50}
        />
        <br />
      </div>
    )
  }
}

export default DoughnutChartComponent
