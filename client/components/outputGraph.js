import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
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
      savedGraph: false
    }
  }

  saveAsPDF = () => {
    console.log('save as pdf...!')
    let input = window.document.getElementsByClassName('divToPDF2')[0]
    html2canvas(input)
      .then(canvas => {
        console.log(canvas)
        const imgData = canvas.toDataURL('image/png')
        const pdf = new pdfConverter('l', 'pt')
        pdf.addImage(imgData, 'JPEG', 15, 110, 800, 250)
        pdf.save('test.pdf')
      })
      .catch(err => console.log(err.message))
  }

  saveGraph = () => {
    this.setState({
      savedGraph: true
    })
  }

  renderGraph = graphType => {
    switch (graphType) {
      case 'pie':
        return <PieChartComponent avg={false} graphtype={graphType} />
      case 'avg-pie':
        return <PieChartComponent avg={true} graphtype={graphType} />
      case 'bar':
        return <BarGraphComponent avg={false} graphtype={graphType} />
      case 'avg-bar':
        return <BarGraphComponent avg={true} graphtype={graphType} />
      case 'line':
        return <LineChart avg={false} graphtype={graphType} />
      case 'avg-line':
        return <LineChart avg={true} graphtype={graphType} />
      case 'scatter':
        return <Scatterplot graphtype={graphType} />
      default:
        return (
          <p>Could not find the appropriate graph. Try different data sets!</p>
        )
    }
  }

  render() {
    return (
      <Grid
        className="divToPDF2"
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>{this.renderGraph(this.props.graphType)}</Grid>
        <Grid item>
          <SaveButtons saveAsPDF={this.saveAsPDF} saveGraph={this.saveGraph} />
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
