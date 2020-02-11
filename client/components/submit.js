import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import axios from 'axios'
import {decisionTree} from './test'
import store from '../store'
import {Link} from 'react-router-dom'

class Submit extends React.Component {
  constructor() {
    super()
  }

  testDecisionTree = event => {
    event.preventDefault()
    console.log('test Decision Tree')
    let parsedData = this.props.parsedData
    let column1 = this.props.userOptions.column1
    let column2 = this.props.userOptions.column2
    let option = this.props.userOptions.option
    console.log('PASSING IN:', parsedData, column1, column2, option)
    decisionTree(parsedData, column1, column2, option)
  }

  handleFileSubmit = async event => {
    event.preventDefault()
    console.log('test Decision Tree')

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
      <Link to="/graph">
        <Button
          id="submit-btn"
          variant="contained"
          type="submit"
          color="primary"
          disabled={isDisabled}
          onClick={this.testDecisionTree}
        >
          Graph it!
        </Button>
      </Link>
    )
  }
}

const mapState = state => ({
  uploadedFile: state.upload.file,
  parsedData: state.data.parsedData,
  userOptions: state.upload.userOptions
})

// const mapDispatch = dispatch => ({
//   handleSubmit: file => dispatch(gotUploadFile(file))
// })

export default connect(mapState)(Submit)
