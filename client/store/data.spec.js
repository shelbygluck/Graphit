/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {columns} from './data'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('data thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    data: {
      columns: [],
      columnData: {},
      parsedData: [],
      scatterData: []
    }
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('columns', () => {
    it('eventually dispatches the GOT COLUMNS action', async () => {
      const response = {selectedColumns: ['age', 'state']}
      mockAxios.onGet('/api/userData/1').replyOnce(200, response)
      await store.dispatch(columns(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_COLUMNS')
      expect(actions[0].columns).to.be.deep.equal(response.selectedColumns)
    })
    it('fills store with correct data', async () => {
      const response = {selectedColumns: ['age', 'state']}
      mockAxios.onGet('/api/userData/1').replyOnce(200, response)
      await store.dispatch(columns(1))
      const actions = store.getActions()
      expect(actions[0].columns).to.be.deep.equal(response.selectedColumns)
    })
  })
})
