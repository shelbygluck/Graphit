import posed, {PoseGroup} from 'react-pose'
import React from 'react'

const Box = posed.div({
  small: {
    width: 50,
    height: 150,
    backgroundColor: ({c}) => c
  },
  big: {
    width: 50,
    height: 100,
    backgroundColor: ({c}) => c
  }
})

class Example2 extends React.Component {
  state = {
    size: 'small',
    color: '#ededed'
  }

  componentDidMount() {
    setInterval(
      () =>
        this.setState(state => ({
          size: state.size === 'small' ? 'big' : 'small'
        })),
      1500
    )
    setInterval(
      () =>
        this.setState(state => ({
          color:
            state.color === 'rgba(138, 185, 255, 1)'
              ? '#ededed'
              : 'rgba(138, 185, 255, 1)'
        })),
      2550
    )
  }

  render() {
    return <Box pose={this.state.size} c={this.state.color} className="box" />
  }
}

export default Example2
