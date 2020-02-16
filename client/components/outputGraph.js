import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Grid, Modal} from '@material-ui/core'
import BarGraphComponent from './bar'
import PieChartComponent from './pie'
import LineChart from './line'
import Scatterplot from './scatterplots'
import SaveGraph from './save-graph'
import SaveButtons from './saveButtons'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')

class OutputGraph extends React.Component {
  constructor() {
    super()
    this.state = {
      savedGraph: false,
      open: false
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  saveGraph = () => {
    this.setState({
      savedGraph: true
    })
  }

  renderGraph = (graphType, fullscreen) => {
    switch (graphType) {
      case 'pie':
        return (
          <PieChartComponent
            avg={false}
            graphtype={graphType}
            fullscreen={fullscreen}
          />
        )
      case 'avg-pie':
        return (
          <PieChartComponent
            avg={true}
            graphtype={graphType}
            fullscreen={fullscreen}
          />
        )
      case 'bar':
        return (
          <BarGraphComponent
            avg={false}
            graphtype={graphType}
            fullscreen={fullscreen}
          />
        )
      case 'avg-bar':
        return (
          <BarGraphComponent
            avg={true}
            graphtype={graphType}
            fullscreen={fullscreen}
          />
        )
      case 'line':
        return (
          <LineChart
            avg={false}
            graphtype={graphType}
            fullscreen={fullscreen}
          />
        )
      case 'avg-line':
        return (
          <LineChart avg={true} graphtype={graphType} fullscreen={fullscreen} />
        )
      case 'scatter':
        return <Scatterplot graphtype={graphType} fullscreen={fullscreen} />
      default:
        return (
          <p>Could not find the appropriate graph. Try different data sets!</p>
        )
    }
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          {this.renderGraph(this.props.graphType)}
          <Modal
            className="modal"
            open={this.state.open}
            onClose={this.handleClose}
          >
            {this.renderGraph(this.props.graphType, this.state.open)}
          </Modal>
        </Grid>
        <Grid item>
          <SaveButtons saveAsPDF={this.handleOpen} saveGraph={this.saveGraph} />
        </Grid>
        <Grid item>
          {this.state.savedGraph === true && (
            <SaveGraph
              type={this.props.graphType}
              columnData={this.props.graph.data}
              columns={this.props.graph.columns}
            />
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps)(OutputGraph)
