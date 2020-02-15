import html2canvas from 'html2canvas'

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
