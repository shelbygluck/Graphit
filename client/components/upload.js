import React, {Fragment} from 'react'
import Papa from 'papaparse'
import Columns from './columns'

export default class Upload extends React.Component {
  constructor() {
    super()
    this.state = {
      columns: null,
      selectedFile: null
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleFileSubmit = this.handleFileSubmit.bind(this)
  }

  handleFileUpload(event) {
    const file = event.target.files[0]

    Papa.parse(file, {
      complete: results => {
        this.getParsedData(results.data)
      }
    })
  }

  getParsedData(parsedData) {
    this.setState({
      columns: parsedData[0],
      selectedFile: parsedData
    })
  }

  async handleFileSubmit(event) {
    event.preventDefault()
    let formData = new FormData()
    formData.append('file', this.state.selectedFile)

    // try {
    //   await axios.post('/api/charts', formData)
    // } catch (err) {
    //   console.log(err)
    // }
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
