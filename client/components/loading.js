import React from 'react'
import {WindMillLoading} from 'react-loadingg'
import MainComponent from '../components/mainComponent'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: undefined
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({done: true}), 3000)
  }

  render() {
    return (
      <div>
        {!this.state.done ? (
          <WindMillLoading size="large" />
        ) : (
          <MainComponent />
        )}
      </div>
    )
  }
}
