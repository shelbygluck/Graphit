import React from 'react'
import {Line} from 'react-chartjs-2'
import {connect} from 'react-redux'
import {columnData} from '../store/data'

let columns = ['STATE', 'AGE']
let columnDataa = {
  STATE: ['OH', 'IN', 'SC', 'OH', 'AR', 'AZ', 'AK', 'WA', 'UT', 'WA'],
  AGE: ['37', '28', '65', '41', '23', '54', '52', '44', '61', '39']
}

export class LineChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: columnDataa[columns[0]],
      datasets: [
        {
          label: 'Rainfall',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: columnDataa[columns[1]]
        }
      ]
    }
  }

  componentDidMount() {
    this.props.loadColumnData(2)
  }

  render() {
    console.log('PROPS:', this.props)
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

const mapStateToProps = state => ({
  user: state.user,
  columnData: state.data
})

const mapDispatchToProps = dispatch => {
  return {
    loadColumnData: id => dispatch(columnData(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart)
