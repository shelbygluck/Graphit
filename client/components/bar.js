import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import {connect} from 'react-redux'
import {columnData} from '../store/data'

export class BarGraphComponent extends Component {
  componentDidMount() {
    this.props.loadColumnData(this.props.user.id)
  }

  render() {
    console.log('LABELS', this.props.columnData[this.props.columns[1]])
    console.log('DATA', this.props.columnData[this.props.columns[0]])

    return (
      <div>
        <Bar
          data={{
            labels: this.props.columnData[this.props.columns[1]],
            datasets: [
              {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: this.props.columnData[this.props.columns[0]]
              }
            ]
          }}
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

export default connect(mapStateToProps, mapDispatchToProps)(BarGraphComponent)
