import React, {Fragment} from 'react'
import Papa from 'papaparse'
import axios from 'axios'
import Columns from './columns'

export default class Upload extends React.Component {
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
  }

  handleFileSubmit = async event => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('file', this.state.selectedFile)

    try {
      const {data} = await axios({
        method: 'post',
        url: '/api/charts',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      })
      //const {data} = await axios.post('/api/charts', this.state.selectedFile)
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
