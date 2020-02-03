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
export const columns = userId => async dispatch => {
  try {
    // let keys = Object.keys(jsondata[0])
    let res = await axios.get(`/api/userData/${userId}`)
    let selectedColumns = res.data.selectedColumns
    dispatch(getColumns(selectedColumns))
  } catch (err) {
    console.error(err)
  }
}

export const columnData = userId => async dispatch => {
  console.log('GOT HERE')

  try {
    let dict = {}

    let res = await axios.get(`/api/userData/${userId}`)

    console.log('res:', res)
    console.log('res.data:', res.data[0])

    let columnNames = res.data[0].selectedColumns

    columnNames.forEach(key => {
      dict[key] = []
    })

    let jsondata = res.data[0].rawData

    jsondata.forEach(obj => {
      for (let key in obj) {
        if (columnNames.includes(key)) {
          dict[key].push(obj[key])
        }
      }
    })

    console.log('DICT:', dict)

    dispatch(getColumnData(dict))
    // console.log('COLUMN NAMES:', columnNames)
    // dispatch(columns(columnNames))
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
