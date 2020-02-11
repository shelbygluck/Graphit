import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Grid} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Grid
    id="navbar"
    container
    justify="space-between"
    alignItems="center"
    spacing={2}
  >
    <Grid item>
      <Link to="/">Graphit</Link>
    </Grid>
    <Grid item>
      <Link to="/profile">My Charts</Link>
    </Grid>
    <Grid item>
      {isLoggedIn ? (
        <Grid item>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </Grid>
      ) : (
        <Grid item>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </Grid>
      )}
    </Grid>
  </Grid>
)

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
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
