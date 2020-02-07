import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {Grid} from '@material-ui/core'

const App = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item sm={12}>
        <Navbar />
      </Grid>
      <Grid item sm={12}>
        <Routes />
      </Grid>
    </Grid>
  )
}

export default App
