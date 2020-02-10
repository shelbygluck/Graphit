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
  Button,
  FormControl,
  InputLabel
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
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

  description() {
    return (
      <Grid item sm={12}>
        <p>
          I want to see how <b>{this.state.column1}</b> {this.state.option}{' '}
          <b>{this.state.column2}</b>.{' '}
        </p>
      </Grid>
    )
  }

  render() {
    if (this.props.allColumns.length < 0)
      return <div>Could not get column names from the data set.</div>
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <h3>Help us to understand your data relationships</h3>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <FormControl>
              <InputLabel id="column1">First choice</InputLabel>
              <Select
                className="select"
                labelId="column1"
                name="column1"
                value={this.state.column1}
                onChange={this.handleOnSelect}
              >
                {this.createOptions(this.props.allColumns)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <RadioGroup
              className="select"
              name="option"
              onChange={this.handleOnSelect}
            >
              {this.createRadioButtons()}
            </RadioGroup>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="column2">Second choice</InputLabel>
              <Select
                className="select"
                labelId="column2"
                name="column2"
                value={this.state.column2}
                onChange={this.handleOnSelect}
              >
                {this.createOptions(this.props.allColumns)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {this.state.column1 &&
          this.state.column2 &&
          this.state.option &&
          this.description()}
        <Grid item sm={12}>
          <Submit />
        </Grid>
      </Grid>
    )
  }
}

const mapDispatch = dispatch => ({
  setUserOptions: options => dispatch(gotUserOptions(options))
})

export default connect(null, mapDispatch)(Columns)
