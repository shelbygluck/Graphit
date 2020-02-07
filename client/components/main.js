import React, {Component} from 'react'
import Upload from './upload'
import {Grid} from '@material-ui/core'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className="header">
          <h1>Your data, we visualize</h1>
          <h2>
            Upload or drop .csv file to get the best visualization of your data
          </h2>
        </Grid>
        <Grid item>
          <Upload />
        </Grid>
      </Grid>
    )
  }
}

export default Main
