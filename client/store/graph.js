/**
 * ACTION TYPES
 */
const GOT_GRAPH = 'GOT_GRAPH'

/**
 * INITIAL STATE
 */
const defaultState = {
  type: [],
  data: {}
}

/**
 * ACTION CREATORS
 */
export const gotGraph = output => ({
  type: GOT_GRAPH,
  output
})

/**
 * REDUCER
 */
export const graphReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GOT_GRAPH:
      return {...state, ...action.output}
    default:
      return state
  }
}

export default graphReducer
