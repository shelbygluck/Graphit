import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Upload from './upload'
import {Grid} from '@material-ui/core'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Upload />
  }
}

export default Main
