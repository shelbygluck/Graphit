import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {saveChart} from '../store/savedChart'

class SaveGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      columnData: this.props.columnData,
      columns: this.props.columns,
      userId: this.props.user.id,
      type: this.props.type
    }
    this.submitHandle = this.submitHandle.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
  }

  changeHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitHandle(event) {
    event.preventDefault()
    console.log(this.state)
    this.props.saveChart(this.state)
    // return (<Redirect to='/profile/' />)
  }

  render() {
    console.log('SAVING GRAPH', this.props)
    return (
      <div>
        <p>Enter Graph Name To Save</p>
        <form onSubmit={this.submitHandle}>
          <label htmlFor="name">Graph Name: </label>
          <input
            onChange={this.changeHandle}
            type="text"
            name="name"
            value={this.state.name}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    saveChart: function(chart) {
      const thunk = saveChart(chart)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveGraph)
