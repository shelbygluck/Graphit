import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup} from './components'
import PieChartComponent from './components/pie'
import LineChart from './components/line'
import ScatterPlot from './components/scatterplots'
import BarGraphComponent from './components/bar'
import {me} from './store'
import Main from './components/main'
import MainComponent from './components/mainComponent'
import Profile from './components/Profile'
import SingleChart from './components/single-chart'
import Loading from '../client/components/loading'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/graph" component={Loading} />
        <Route exact path="/" component={Main} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/pie" component={PieChartComponent} />
            <Route path="/line" component={LineChart} />
            <Route path="/scatterplots" component={ScatterPlot} />
            <Route path="/bar" component={BarGraphComponent} />
            <Route path="/test" component={MainComponent} />
            <Route path="/profile" component={Profile} />
            <Route path="/graph" component={Loading} />
            <Route path="/single/:id" component={SingleChart} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
