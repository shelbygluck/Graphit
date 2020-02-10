import axios from 'axios'
import history from '../history'
import {combineReducers} from 'redux'
import {isUnique} from '../helpers/isUnique'
import {average, sum} from '../helpers/averageAndSum'

/**
 * ACTION TYPES
 */
const GOT_COLUMNS = 'GOT_COLUMNS'
const GET_COLUMN_DATA = 'GET_COLUMN_DATA'
const GOT_PARSED_DATA = 'GOT_PARSED_DATA'
const GOT_SCATTER_DATA = 'GOT_SCATTER_DATA'

/**
 * INITIAL STATE
 */
const defaultState = {
  columns: [],
  columnData: {},
  parsedData: [],
  scatterData: []
}

/**
 * ACTION CREATORS
 */
export const gotColumns = columns => ({type: GOT_COLUMNS, columns})
const getColumnData = columnData => ({type: GET_COLUMN_DATA, columnData})
export const gotParsedData = parsedData => ({type: GOT_PARSED_DATA, parsedData})
const gotScatterData = columnData => ({type: GOT_SCATTER_DATA, columnData})
/**
 * THUNK CREATORS
 */
export const columns = userId => async dispatch => {
  try {
    // let keys = Object.keys(jsondata[0])
    let res = await axios.get(`/api/userData/${userId}`)
    let selectedColumns = res.data.selectedColumns
    dispatch(gotColumns(selectedColumns))
  } catch (err) {
    console.error(err)
  }
}

export const columnData = userId => async dispatch => {
  try {
    let dict = {}

    let res = await axios.get(`/api/userData/${userId}`)

    let columnNames = res.data.selectedColumns

    columnNames.forEach(key => {
      dict[key] = []
    })

    let jsondata = res.data.rawData

    jsondata.forEach(obj => {
      for (let key in obj) {
        if (columnNames.includes(key)) {
          dict[key].push(obj[key])
        }
      }
    })
    let summed = average(dict[columnNames[1]], dict[columnNames[0]])

    dict[columnNames[0]] = summed[1]
    dict[columnNames[1]] = summed[0]

    dispatch(getColumnData(dict))
    dispatch(gotColumns(columnNames))
  } catch (error) {
    console.error(error)
  }
}

export const scatterData = userId => async dispatch => {
  try {
    let scatter = []

    let res = await axios.get(`/api/userData/${userId}`)

    let columnNames = res.data.selectedColumns

    let jsondata = res.data.rawData

    jsondata.forEach(obj => {
      scatter.push({
        x: parseInt(obj[columnNames[0]], 10),
        y: parseInt(obj[columnNames[1]], 10)
      })
    })

    dispatch(gotScatterData(scatter))
    dispatch(gotColumns(columnNames))
  } catch (error) {
    console.error(error)
  }
}

/*
 * REDUCER
 */
const columnReducer = (state = defaultState.columns, action) => {
  switch (action.type) {
    case GOT_COLUMNS:
      return action.columns
    default:
      return state
  }
}

const colummnDataReducer = (state = defaultState.columnData, action) => {
  switch (action.type) {
    case GET_COLUMN_DATA:
      return action.columnData
    default:
      return state
  }
}

const parsedDataReducer = (state = defaultState.parsedData, action) => {
  switch (action.type) {
    case GOT_PARSED_DATA:
      return action.parsedData
    default:
      return state
  }
}

const scatterReducer = (state = defaultState.scatterData, action) => {
  switch (action.type) {
    case GOT_SCATTER_DATA:
      return action.columnData
    default:
      return state
  }
}

export default combineReducers({
  columns: columnReducer,
  columnData: colummnDataReducer,
  parsedData: parsedDataReducer,
  scatterData: scatterReducer
})
