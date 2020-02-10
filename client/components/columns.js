import React from 'react'
import {connect} from 'react-redux'
import {gotUserOptions} from '../store/upload'
import {
  Grid,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from '@material-ui/core'
import Submit from './submit'

class Columns extends React.Component {
  constructor() {
    super()
    this.state = {
      column1: '',
      column2: '',
      option: ''
    }
  }

  // updates userOptions in redux store whenever user changes any selections
  handleOnSelect = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    let newUserOption = {[event.target.name]: event.target.value}
    this.props.setUserOptions({...this.state, ...newUserOption})
  }

  // creates a list of column names for a drop down selection
  createOptions = columns => {
    let options = []
    columns.map((column, idx) => {
      options.push(
        <MenuItem key={idx} value={column}>
          {column}
        </MenuItem>
      )
    })
    return options
  }

  // creates a list of radio buttons for relationship option
  createRadioButtons = () => {
    let radioButtons = []
    const relationships = [
      'is influenced by',
      'compares to',
      'is broken down by'
    ]
    relationships.forEach((label, idx) => {
      radioButtons.push(
        <FormControlLabel
          key={idx}
          value={label}
          control={<Radio color="primary" />}
          label={label}
          labelPlacement="end"
        />
      )
    })
    return radioButtons
  }

  render() {
    if (this.props.allColumns.length < 0)
      return <div>Could not get column names from the data set.</div>
    return (
      <Grid container>
        <Grid item sm={4}>
          <Select
            name="column1"
            value={this.state.column1}
            onChange={this.handleOnSelect}
            displayEmpty
          >
            {this.createOptions(this.props.allColumns)}
          </Select>
        </Grid>
        <Grid item sm={4}>
          <RadioGroup name="option" onChange={this.handleOnSelect}>
            {this.createRadioButtons()}
          </RadioGroup>
        </Grid>
        <Grid item sm={4}>
          <Select
            name="column2"
            value={this.state.column2}
            onChange={this.handleOnSelect}
            displayEmpty
          >
            {this.createOptions(this.props.allColumns)}
          </Select>
        </Grid>
        <Submit />
      </Grid>
    )
  }
}

const mapDispatch = dispatch => ({
  setUserOptions: options => dispatch(gotUserOptions(options))
})

export default connect(null, mapDispatch)(Columns)
