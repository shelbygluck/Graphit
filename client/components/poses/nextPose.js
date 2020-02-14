import posed, {PoseGroup} from 'react-pose'
import React from 'react'

const Box = posed.div({
  small: {
    width: 30,
    height: 90,
    backgroundColor: ({c}) => c
  },
  big: {
    width: 30,
    height: 120,
    backgroundColor: ({c}) => c
  }
})

class Example5 extends React.Component {
  state = {
    size: 'small',
    color: 'rgba(69, 103, 178, 1)'
  }

  componentDidMount() {
    setInterval(
      () =>
        this.setState(state => ({
          size: state.size === 'small' ? 'big' : 'small'
        })),
      500
    )
    setInterval(
      () =>
        this.setState(state => ({
          color: state.color === '#ededed' ? 'rgba(69, 103, 178, 1)' : '#ededed'
        })),
      520
    )
  }

  render() {
    return <Box pose={this.state.size} c={this.state.color} className="box" />
  }
}

export default Example5
