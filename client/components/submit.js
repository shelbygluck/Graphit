import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import axios from 'axios'

class Submit extends React.Component {
  constructor() {
    super()
  }

  handleFileSubmit = async event => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('file', this.props.uploadedFile)
    const {column1, column2} = this.props.userOptions
    formData.append('selectedColumns', [column1, column2])

    try {
      const {data} = await axios({
        method: 'post',
        url: '/api/charts',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      })
      console.log('post api/charts', data)
    } catch (err) {
      console.log(err)
    }
  }

  buttonDisabled = () => {
    const {column1, column2, option} = this.props.userOptions
    if (column1 && column2 && option) {
      return false
    } else {
      return true
    }
  }

  render() {
    const isDisabled = this.buttonDisabled()
    return (
      <Button
        variant="contained"
        type="submit"
        disabled={isDisabled}
        onClick={this.handleFileSubmit}
      >
        Graph it!
      </Button>
    )
  }
}

const mapState = state => ({
  uploadedFile: state.upload.file,
  userOptions: state.upload.userOptions
})

// const mapDispatch = dispatch => ({
//   handleSubmit: file => dispatch(gotUploadFile(file))
// })

export default connect(mapState)(Submit)
