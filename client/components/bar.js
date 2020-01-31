import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'

class BarGraphComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Bar
          data={this.state}
          height={50}
          options={{
            title: {
              dispaly: true,
              text: 'Average Rainfall Per Month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
        <br />
      </div>
    )
  }
}

export default BarGraphComponent
