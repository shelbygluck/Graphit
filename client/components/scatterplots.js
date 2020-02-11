import React from 'react'
import {Scatter} from 'react-chartjs-2'
import {connect} from 'react-redux'
// import {scatterData} from '../store/data'
import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')
import SaveGraph from './save-graph'

export class Scatterplot extends React.Component {
  constructor() {
    super()
    this.state = {
      savedGraph: false
    }
  }

  saveAsPDF() {
    let input = window.document.getElementsByClassName('divToPDF')[0]
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

  saveGraph() {
    this.setState({
      savedGraph: true
    })
  }

  render() {
    console.log('SCATTERRRR', this.props)
    return (
      <div>
        <div className="divToPDF">
          <Scatter
            data={{
              labels: 'Scatter Dataset',
              datasets: [
                {
                  label: `${this.props.graph.columns[0]} vs. ${
                    this.props.graph.columns[1]
                  }`,
                  // label: 'test',
                  data: this.props.graph.scatterData,
                  backgroundColor: 'navy'
                }
              ]
            }}
            options={{
              scales: {
                xAxes: [
                  {
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                      display: true,
                      labelString: this.props.graph.columns[0]
                    }
                  }
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: this.props.graph.columns[1]
                    }
                  }
                ]
              }
            }}
          />
        </div>
        <div>
          <button onClick={() => this.saveAsPDF()}>Save as PDF</button>
          <button onClick={() => this.saveGraph()}>Save This Graph</button>
          {this.state.savedGraph === true ? (
            <SaveGraph
              type="scatter"
              columnData={this.props.graph.data}
              columns={this.props.graph.columns}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph: state.graph
})

export default connect(mapStateToProps, null)(Scatterplot)
