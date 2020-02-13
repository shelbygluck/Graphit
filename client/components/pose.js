import posed, {PoseGroup} from 'react-pose'
import React from 'react'
import ReactDOM from 'react-dom'

class Example extends React.Component {
  state = {isVisible: false}

  componentDidMount() {
    setInterval(() => {
      this.setState({
        isVisible: true
      })
    }, 2000)
  }

  render() {
    return (
      <div>
        {this.state.isVisible && [
          <div key="shade" className="shade" />,
          <div key="modal" className="modal" />
        ]}
      </div>
    )
  }
}

export default Example

const rootElement = document.getElementById('app')
ReactDOM.render(<Example />, rootElement)
