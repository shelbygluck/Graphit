import React from 'react'
import {Scatter} from 'react-chartjs-2'
import {connect} from 'react-redux'
import {scatterData} from '../store/data'

export class Scatterplot extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     labels: 'Scatter Dataset',
  //     datasets: [
  //       {
  //         label: 'Rainfall',
  //         data: [
  //           {x: -10, y: 0},
  //           {x: 0, y: 10},
  //           {x: 10, y: 5},
  //           {x: -2, y: 4}
  //         ],
  //         backgroundColor: ['red', 'blue', 'green', 'black']
  //       }
  //     ]
  //   }
  // }

  componentDidMount() {
    let userId = this.props.user.id
    this.props.loadColumnData(userId)
  }
  render() {
    console.log(this.props, 'props here!!!')
    console.log(typeof this.props.columns, 'COLUMNSSSS')

    return (
      <div>
        <Scatter
          data={{
            labels: 'Scatter Dataset',
            datasets: [
              {
                label: 'Rainfall',
                data: this.props.scatterData,
                backgroundColor: ['red', 'blue', 'green', 'black', 'grey']
              }
            ]
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

const mapStateToProps = state => ({
  user: state.user,
  scatterData: state.data.scatterData,
  columns: state.data.columns
})

const mapDispatchToProps = dispatch => {
  return {
    loadColumnData: id => dispatch(scatterData(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scatterplot)
