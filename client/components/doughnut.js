import React, {Component} from 'react'
import {Doughnut} from 'react-chartjs-2'
import {connect} from 'react-redux'
import {columnData} from '../store/data'

export class DoughnutChartComponent extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     labels: ['under 18', 'age 18-54', 'age 55+'],
  //     datasets: [
  //       {
  //         data: [8000, 4000, 2850],
  //         backgroundColor: ['red', 'blue', 'green']
  //       }
  //     ]
  //   }
  // }

  componentDidMount() {
    this.props.loadColumnData(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h1>Donut Chart</h1>
        <Doughnut
          data={{
            labels: this.props.columnData[this.props.columnData[1]],
            datasets: [
              {
                data: this.props.columnData[this.props.columnData[0]],
                backgroundColor: ['red', 'blue', 'green']
              }
            ]
          }}
          height={50}
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

export default connect(mapStateToProps, mapDispatchToProps)(
  DoughnutChartComponent
)
