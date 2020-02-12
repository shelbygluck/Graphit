import React from 'react'
import {EatLoading} from 'react-loadingg'
import MainComponent from '../components/mainComponent'
import {Paper} from '@material-ui/core'
import Logo from './logo'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: undefined
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({done: true}), 1200)
  }

  render() {
    return (
      <div>
        {!this.state.done ? (
          <EatLoading color="blue" size="large" />
        ) : (
          <Paper elevation={3}>
            <Logo />
            <MainComponent />
          </Paper>
        )}
      </div>
    )
  }
}
