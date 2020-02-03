import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Papa from 'papaparse'
import axios from 'axios'
import Columns from './columns'
import {gotParsedData} from '../store/data'

class Upload extends React.Component {
  constructor() {
    super()
    this.state = {
      columns: null,
      selectedFile: null,
      parsedData: null
    }
  }

  handleFileUpload = event => {
    const file = event.target.files[0]
    console.log('event.target.files', file)
    this.setState({
      selectedFile: file
    })
    Papa.parse(file, {
      header: true,
      complete: results => {
        this.getParsedData(results.data)
        console.log('papa parsed data', results.data)
      }
    })
  }

  getParsedData = parsedData => {
    this.setState({
      columns: Object.keys(parsedData[0]),
      parsedData: parsedData
    })
    this.props.gotParsedData(parsedData)
  }

  handleFileSubmit = async event => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('file', this.state.selectedFile)
    formData.append('selectedColumns')

    try {
      const {data} = await axios({
        method: 'post',
        url: '/api/charts',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const columns = this.state.columns
    return (
      <Fragment>
        <form onSubmit={this.handleFileSubmit}>
          <p>Choose the file to upload</p>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={this.handleFileUpload}
          />
          <input type="submit" value="Upload File" />
        </form>
        {columns && <Columns columns={this.state.columns} />}
      </Fragment>
    )
  }
}

const mapState = state => ({
  parsedData: state.data.parsedData,
  selectedColumns: state.data.columns
})

const mapDispatch = dispatch => ({
  gotParsedData: data => dispatch(gotParsedData(data))
})

export default connect(mapState, mapDispatch)(Upload)
