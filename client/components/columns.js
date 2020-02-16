import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {gotUploadedFile, gotUserOptions} from '../store/upload'
import {clearGraph} from '../store/graph'
import {
  Grid,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  InputLabel,
  Paper
} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import Submit from './submit'
import MainComponent from './mainComponent'

class Columns extends React.Component {
  constructor() {
    super()
    this.state = {
      column1: '',
      column2: '',
      option: ''
    }
  }

  handleOnSelect = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    let newUserOption = {[event.target.name]: event.target.value}
    this.props.setUserOptions({...this.state, ...newUserOption})
  }

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
      <Grid className="desc" item sm={12}>
        <p>
          I want to see how <b>{this.state.column1 || 'first choice'}</b>{' '}
          <em>{this.state.option || 'relates to'}</em>{' '}
          <b>{this.state.column2 || 'second choice'}</b>.
        </p>
      </Grid>
    )
  }

  clearUploadedFile = () => {
    this.props.uploadFile(null)
    this.props.clearGraph(null)
  }

  displayOutput = () => {
    return (
      <Paper className="paper-container" elevation={3}>
        <MainComponent />
      </Paper>
    )
  }

  render() {
    return (
      <Fragment>
        {this.props.output.length > 0 && this.displayOutput()}
        <Paper className="paper-container" elevation={3}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid className="fa-btn" container justify="flex-start">
              <Button onClick={this.clearUploadedFile}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <div>Upload a different file</div>
              </Button>
            </Grid>
            <Grid item>
              <h2>Help us to understand your data relationships</h2>
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
                    {this.createOptions(this.props.columns)}
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
                    {this.createOptions(this.props.columns)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {this.description()}
            <Grid item sm={12}>
              <Submit />
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    )
  }
}

const mapState = state => ({
  columns: state.data.columns,
  output: state.graph.type
})

const mapDispatch = dispatch => ({
  uploadFile: file => dispatch(gotUploadedFile(file)),
  clearGraph: () => dispatch(clearGraph()),
  setUserOptions: options => dispatch(gotUserOptions(options))
})

export default connect(mapState, mapDispatch)(Columns)
