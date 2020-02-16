import html2canvas from 'html2canvas'
const pdfConverter = require('jspdf')

/**
 * ACTION TYPES
 */
const GOT_GRAPH = 'GOT_GRAPH'
const CLEAR_GRAPH = 'CLEAR_GRAPH'
const GOT_GRAPH_IMAGE_DATA = 'GOT_GRAPH_IMAGE_DATA'

/**
 * INITIAL STATE
 */
const defaultState = {
  type: [],
  data: {},
  imgData: ''
}

/**
 * ACTION CREATORS
 */
export const gotGraph = output => ({
  type: GOT_GRAPH,
  output
})

export const clearGraph = () => ({
  type: CLEAR_GRAPH
})

export const gotGraphImageData = imgData => ({
  type: GOT_GRAPH_IMAGE_DATA,
  imgData
})

export const saveAsPDF = () => {
  console.log('save as pdf...! local')
  let input = window.document.getElementsByClassName('printPDF')[0]
  html2canvas(input)
    .then(canvas => {
      console.log(canvas)
      const imgData = canvas.toDataURL('image/jpeg')
      const pdf = new pdfConverter('l', 'pt')
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = imgProps.height * pdfWidth / imgProps.width
      pdf.addImage(imgData, 15, 30, pdfWidth - 30, pdfHeight)
      pdf.save('test.pdf')
    })
    .catch(err => console.log(err.message))
}

/**
 * REDUCER
 */
export const graphReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GOT_GRAPH:
      return {...state, ...action.output}
    case CLEAR_GRAPH:
      return defaultState
    case GOT_GRAPH_IMAGE_DATA:
      return {...state, ...action.imgData}
    default:
      return state
  }
}

export default graphReducer
