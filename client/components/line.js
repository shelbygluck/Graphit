import React from 'react'
import {Line} from 'react-chartjs-2'

let columns = ['STATE', 'AGE']
let columnData = {
  STATE: ['OH', 'IN', 'SC', 'OH', 'AR', 'AZ', 'AK', 'WA', 'UT', 'WA'],
  AGE: ['37', '28', '65', '41', '23', '54', '52', '44', '61', '39']
}

export default class LineChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: columnData[columns[0]],
      datasets: [
        {
          label: 'Rainfall',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: columnData[columns[1]]
        }
      ]
    }
  }
  render() {
    return (
      <div>
        <Line
          data={{
            labels: this.state.labels,
            datasets: this.state.datasets
          }}
          options={{
            title: {
              display: true,
              text: 'Average Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
    )
  }
}
