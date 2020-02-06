import React, {Component} from 'react'
import {connect} from 'react-redux'
import {columnData} from '../store/data'
import {Pie} from 'react-chartjs-2'

export class PieChartComponent extends Component {
  componentDidMount() {
    this.props.loadColumnData(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h1>Pie Chart</h1>
        <Pie
          data={{
            labels: this.props.columnData[this.props.columns[1]],
            datasets: [
              {
                data: this.props.columnData[this.props.columns[0]],
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

export default connect(mapStateToProps, mapDispatchToProps)(PieChartComponent)
