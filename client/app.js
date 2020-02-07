import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {Grid} from '@material-ui/core'

const App = () => {
  return (
    <Grid container>
      <Navbar />
      <Routes />
    </Grid>
  )
}

export default App
