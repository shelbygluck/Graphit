import React from 'react'
import {saveAsPDF} from '../store/graph'
import {Grid, Button} from '@material-ui/core'

const DownloadButton = () => {
  return (
    <Grid container justify="center">
      <Button variant="contained" color="primary" onClick={saveAsPDF}>
        Download
      </Button>
    </Grid>
  )
}

export default DownloadButton
