import React, {Fragment} from 'react'
import {Grid, Button} from '@material-ui/core'

const SaveButtons = ({saveAsPDF, saveGraph}) => {
  return (
    <Grid
      className="saveButtons"
      container
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Button variant="contained" color="primary" onClick={saveAsPDF}>
          Save as PDF
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={saveGraph}>
          Save to My Charts
        </Button>
      </Grid>
    </Grid>
  )
}

export default SaveButtons
