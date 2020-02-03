import React from 'react'
import {connect} from 'react-redux'
import {gotColumns} from '../store/data'

class Columns extends React.Component {
  constructor() {
    super()
    this.state = {
      numberOfOptions: 2,
      columns: []
    }
  }

  handleOnSelect = event => {
    let columns = this.state.columns
    const idx = Number(event.target.name)
    columns[idx] = event.target.value
    this.props.gotColumns(columns)
    this.setState({columns})
  }

  createOptions = columns => {
    let options = []
    for (let i = 0; i < this.state.numberOfOptions; i++) {
      options[i] = []
      columns.map((column, idx) => {
        const key = `${column}-${i}-${idx}`
        options[i].push(
          <option key={key} value={column}>
            {column}
          </option>
        )
      })
    }
    return options
  }

  render() {
    console.log(this.state)
    const lists = this.createOptions(this.props.columns)
    if (lists.length < 0)
      return <div>Could not get column names from the data set.</div>
    return (
      <div>
        {lists.map((list, idx) => {
          const key = `column${idx + 1}`
          return (
            <select name={idx} key={key} onChange={this.handleOnSelect}>
              {list}
            </select>
          )
        })}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  gotColumns: columns => dispatch(gotColumns(columns))
})

export default connect(null, mapDispatch)(Columns)
