import React from 'react'
import {Scatter} from 'react-chartjs-2'

export default class Scatterplot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: 'Scatter Dataset',
      datasets: [
        {
          label: 'Rainfall',
          data: [{x: -10, y: 0}, {x: 0, y: 10}, {x: 10, y: 5}, {x: -2, y: 4}],
          backgroundColor: ['red', 'blue', 'green', 'black']
        }
      ]
    }
  }
  render() {
    return (
      <div>
        <Scatter
          data={{
            labels: this.state.labels,
            datasets: this.state.datasets
          }}
          options={{
            scales: {
              xAxes: [
                {
                  type: 'linear',
                  position: 'bottom'
                }
              ]
            }
          }}
        />
      </div>
    )
  }
}
