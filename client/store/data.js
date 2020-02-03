import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_COLUMNS = 'GET_COLUMNS'
const GET_COLUMN_DATA = 'GET_COLUMN_DATA'

/**
 * INITIAL STATE
 */
const defaultState = {
  colums: [],
  columnData: {}
}

/**
 * ACTION CREATORS
 */
const getColumns = columns => ({type: GET_COLUMNS, columns})
const getColumnData = columnData => ({type: GET_COLUMN_DATA, columnData})

/**
 * THUNK CREATORS
 */
export const columns = jsondata => dispatch => {
  try {
    let keys = Object.keys(jsondata[0])
    dispatch(getColumns(keys))
  } catch (err) {
    console.error(err)
  }
}

export const columnData = (jsondata, columnNames) => dispatch => {
  try {
    let dict = {}

    columnNames.forEach(key => {
      dict[key] = []
    })

    jsondata.forEach(obj => {
      for (let key in obj) {
        if (columnNames.includes(key)) {
          dict[key].push(obj[key])
        }
      }
    })

    dispatch(getColumnData(dict))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_COLUMNS:
      return action.columns
    case GET_COLUMN_DATA:
      return action.columnData
    default:
      return state
  }
}
