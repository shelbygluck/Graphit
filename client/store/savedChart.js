import axios from 'axios'
import {combineReducers} from 'redux'
import store from '../store'
import {gotGraph} from '../store/graph'

/**
 * ACTION TYPES
 */

const ADD_CHART = 'ADD_CHART'
const GET_CHARTS = 'GET_CHARTS'

/**
 * INITIAL STATE
 */

const defaultState = {
  savedChart: {},
  myCharts: []
}

/**
 * ACTION CREATORS
 */
export const saved = chart => ({
  type: ADD_CHART,
  chart
})

const getMyCharts = charts => ({
  type: GET_CHARTS,
  charts
})

/**
 * THUNK CREATORS
 */
export const saveChart = chart => async dispatch => {
  try {
    let res = await axios.post(`/api/saved`, chart)
    dispatch(saved(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getChart = userId => async dispatch => {
  try {
    let res = await axios.get(`/api/saved/${userId}`)
    dispatch(getMyCharts(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleChart = chartId => async dispatch => {
  try {
    let res = await axios.get(`/api/saved/chart/${chartId}`)
    console.log('HERE', res.data)

    let columnData = {}
    columnData[res.data.selectedColumns[0]] = res.data.column1
    columnData[res.data.selectedColumns[1]] = res.data.column2

    let scatter = []
    for (let i = 0; i < res.data.column1.length; i++) {
      scatter.push({
        x: res.data.column1[i],
        y: res.data.column2[i]
      })
    }

    let data = {
      type: [res.data.type],
      data: columnData,
      columns: res.data.selectedColumns,
      scatterData: scatter,
      imageURL: res.data.imageURL
    }

    dispatch(saved(data))
    store.dispatch(gotGraph(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
const myChartsReducer = (state = defaultState.myCharts, action) => {
  switch (action.type) {
    case ADD_CHART:
      return [...state, action.chart]
    case GET_CHARTS:
      return action.charts
    default:
      return state
  }
}

const oneChartReducer = (state = defaultState.savedChart, action) => {
  switch (action.type) {
    case ADD_CHART:
      return action.chart
    default:
      return state
  }
}

export default combineReducers({
  myCharts: myChartsReducer,
  savedChart: oneChartReducer
})
