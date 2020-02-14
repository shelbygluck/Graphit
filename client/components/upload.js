import React from 'react'
import {connect} from 'react-redux'
import Papa from 'papaparse'
import Logo from './logo'
import {gotParsedData, gotColumns} from '../store/data'
import {gotUploadedFile} from '../store/upload'
import {Button, Grid, Paper} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUpload} from '@fortawesome/free-solid-svg-icons'

class Upload extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadedFile: null
    }
  }

  handleFileUpload = event => {
    const file = event.target.files[0]
    this.setState({
      uploadedFile: file
    })
    this.props.uploadFile(file)

    this.parseUploadedFile(file)
  }

  parseUploadedFile = file => {
    let size = file.size
    let percent = 0
    let data = []
    Papa.parse(file, {
      header: true,
      step: row => {
        data.push(row.data)
      },
      complete: () => {
        this.gotParsedData(data)
      }
    })
  }

  gotParsedData = parsedData => {
    this.props.gotColumns(Object.keys(parsedData[0]))
    this.props.gotParsedData(parsedData)
  }

  render() {
    return (
      <Paper className="paper-container" elevation={3}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item className="header" sm={12}>
            <Logo />
            <h2>Your data, we visualize</h2>
            <h3>Upload .csv file to get the best visualization of your data</h3>
          </Grid>
          <Grid item sm={12} className="fa-btn">
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={this.handleFileUpload}
              id="input-upload"
            />
            <label htmlFor="input-upload">
              <Button
                id="upload-btn"
                variant="contained"
                color="primary"
                component="span"
              >
                <FontAwesomeIcon icon={faUpload} />
                Choose File
              </Button>
            </label>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

const mapState = state => ({
  parsedData: state.data.parsedData
})

const mapDispatch = dispatch => ({
  uploadFile: file => dispatch(gotUploadedFile(file)),
  gotParsedData: data => dispatch(gotParsedData(data)),
  gotColumns: columns => dispatch(gotColumns(columns))
})

export default connect(mapState, mapDispatch)(Upload)
