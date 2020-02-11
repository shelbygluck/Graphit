import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getChart} from '../store/savedChart'
import {Link} from 'react-router-dom'

class Profile extends Component {
  async componentDidMount() {
    await this.props.getChart(this.props.user.id)
  }

  render() {
    console.log('USER PROPS', this.props)
    return (
      <div>
        <h1>Welcome, {this.props.user.email}</h1>
        <p>My Saved Charts:</p>
        <ul>
          {this.props.savedChart.myCharts.map(chart => {
            return (
              <li key={chart.id}>
                <Link to={'/single/' + chart.id}>{chart.name}</Link>
              </li>
            )
          })}
        </ul>
        <FeatGraph />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  savedChart: state.savedChart
})

const mapDispatchToProps = dispatch => {
  return {
    getChart: function(userId) {
      const thunk = getChart(userId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
