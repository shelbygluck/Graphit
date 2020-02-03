import React, {Component} from 'react'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div id="createPageElements">
        <h1>
          You add data,<br /> we graph it.
        </h1>
        <h2>
          Or simply upload your data in .cvs format <br />to get the best
          visualization of your data.
        </h2>
      </div>
    )
  }
}

export default Main
