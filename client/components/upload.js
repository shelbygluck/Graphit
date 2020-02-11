import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Papa from 'papaparse'
import Columns from './columns'
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
    console.log('event.target.files', file)
    this.setState({
      uploadedFile: file
    })
    // upload file to redux store
    this.props.uploadFile(file)

    // parse the uploaded file
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
        // let progress = row.meta.cursor
        // let newPercent = Math.round(progress / size * 100)
        // if (percent === newPercent) return
        // percent = newPercent
        // this.updateProgressBar(newPercent)
      },
      complete: () => {
        this.gotParsedData(data)
      }
    })
  }

  gotParsedData = parsedData => {
    // set list of columns to redux store
    this.props.gotColumns(Object.keys(parsedData[0]))
    // set parsed data state to redux store
    this.props.gotParsedData(parsedData)
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item className="header" sm={12}>
          <div id="main-header">GraphIt</div>
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
