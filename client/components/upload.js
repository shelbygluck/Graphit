import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Papa from 'papaparse'
import Columns from './columns'
import {gotParsedData} from '../store/data'
import {gotUploadedFile} from '../store/upload'
import {Button, LinearProgress} from '@material-ui/core'

class Upload extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadedFile: null,
      percentage: null
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
        let progress = row.meta.cursor
        let newPercent = Math.round(progress / size * 100)
        if (percent === newPercent) return
        percent = newPercent
        this.updateProgressBar(newPercent)
      },
      complete: () => {
        this.gotParsedData(data)
      }
    })
  }

  updateProgressBar = percentage => {
    this.setState({
      percentage: percentage
    })
  }

  gotParsedData = parsedData => {
    this.setState({
      columns: Object.keys(parsedData[0])
    })
    // set parsed data state to redux store
    this.props.gotParsedData(parsedData)
  }

  displayColumns = () => {
    if (this.state.columns) {
      return <Columns allColumns={this.state.columns} />
      // } else {
      //   return (
      //     <LinearProgress variant="determinate" value={this.state.percentage} />
      //   )
    }
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleFileSubmit}>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={this.handleFileUpload}
            id="input-upload"
          />
          <label htmlFor="input-upload">
            <Button variant="contained" color="primary" component="span">
              Choose File
            </Button>
          </label>
          <p> or drag and drop your file </p>
        </form>
        {this.state.uploadedFile && this.displayColumns()}
      </Fragment>
    )
  }
}

const mapState = state => ({
  parsedData: state.data.parsedData
})

const mapDispatch = dispatch => ({
  uploadFile: file => dispatch(gotUploadedFile(file)),
  gotParsedData: data => dispatch(gotParsedData(data))
})

export default connect(mapState, mapDispatch)(Upload)
