import posed, {PoseGroup} from 'react-pose'
import React from 'react'

const Box = posed.div({
  small: {
    width: 50,
    height: 100,
    backgroundColor: ({c}) => c
  },
  big: {
    width: 50,
    height: 100,
    backgroundColor: ({c}) => c
  }
})

class Example3 extends React.Component {
  state = {
    size: 'small',
    color: 'rgba(138, 185, 255, 1)'
  }

  componentDidMount() {
    setInterval(
      () =>
        this.setState(state => ({
          size: state.size === ' big' ? 'small' : 'big'
        })),
      2000
    )
    setInterval(
      () =>
        this.setState(state => ({
          color:
            state.color === 'rgba(138, 185, 255, 1)'
              ? '#ededed'
              : 'rgba(138, 185, 255, 1)'
        })),
      3000
    )
  }

  render() {
    return <Box pose={this.state.size} c={this.state.color} className="box" />
  }
}

export default Example3
