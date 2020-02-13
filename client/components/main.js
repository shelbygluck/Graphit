import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Upload from './upload'
import Columns from './columns'
import {Grid} from '@material-ui/core'
import {columns} from '../store/data'
import Example from './pose'
import Example2 from './fastPose'
import Example3 from './tallPose'
import Example4 from './newPose'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Fragment>
        {this.props.uploadedFile === null ? <Upload /> : <Columns />}
        <div id="backgroundBar">
          <div className="animationContainer">
            <Example />
            <Example2 />
            <Example4 />
            <Example />
            <Example4 />
            <Example3 />
            <Example2 />
            <Example3 />
            <Example />
            <Example4 />
            <Example2 />
            <Example3 />
            <Example4 />
            <Example />
            <Example />
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapState = state => ({
  uploadedFile: state.upload.file
})

// const mapDispatch = dispatch => ({
//   handleSubmit: file => dispatch(gotUploadFile(file))
// })

export default connect(mapState)(Main)
