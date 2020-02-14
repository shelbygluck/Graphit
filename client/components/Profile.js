import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getChart} from '../store/savedChart'
import {Link} from 'react-router-dom'
import SingleChart from './single-chart'
import {MeteorRainLoading} from 'react-loadingg'
import {Grid} from '@material-ui/core'
import Logo from './logo'

class Profile extends Component {
  async componentDidMount() {
    await this.props.getChart(this.props.user.id)
  }

  render() {
    return (
      <div className="page">
        <Grid item className="header" sm={12}>
          <Logo />
          <h2>Choose a graph to view</h2>
        </Grid>

        {/* <MeteorRainLoading size="large" speed="25" color="gray" /> */}
        <div className="all-graphs">
          <div className="personal-info">
            <img className="photo" src="/default-profile-with-dog.png" />
            <h4>{this.props.user.firstName}</h4>
          </div>
          {this.props.savedChart.myCharts.map(chart => {
            return (
              <div className="all-graphs-single" key={chart.id}>
                <Link to={'/single/' + chart.id}>
                  <img className="chart-img" src={chart.imageURL} />
                </Link>
                <Link to={'/single/' + chart.id}>
                  <p className="graph-name">{chart.name}</p>
                </Link>
              </div>
            )
          })}
        </div>
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
