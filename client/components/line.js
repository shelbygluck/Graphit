import React from 'react'
import {Line} from 'react-chartjs-2'
import {connect} from 'react-redux'
import {columnData} from '../store/data'

// let columns = ['STATE', 'AGE']
// let columnDataa = {
//   STATE: ['OH', 'IN', 'SC', 'OH', 'AR', 'AZ', 'AK', 'WA', 'UT', 'WA'],
//   AGE: ['37', '28', '65', '41', '23', '54', '52', '44', '61', '39']
// }

export class LineChart extends React.Component {
  componentDidMount() {
    let userId = this.props.user.id
    this.props.loadColumnData(userId)
  }

  render() {
    return (
      <div>
        <Line
          data={{
            labels: this.props.columnData[this.props.columns[1]],
            datasets: [
              {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: this.props.columnData[this.props.columns[0]]
              }
            ]
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
  columnData: state.data.columnData,
  columns: state.data.columns
})

const mapDispatchToProps = dispatch => {
  return {
    loadColumnData: id => dispatch(columnData(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart)
