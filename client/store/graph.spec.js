/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {gotGraph, graphReducer} from './graph'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
import {createStore} from 'redux'

describe('upload thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    graph: {
      type: [],
      data: {}
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

  xdescribe('columns', () => {
    it('eventually dispatches the GOT COLUMNS action', async () => {
      await store.dispatch('dummy graph')
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_GRAPH')
    })
    it('fills store with correct data', async () => {
      await store.dispatch(gotGraph('dummy graph'))
      const actions = store.getActions()
      expect(actions[0].output).to.be.equal('dummy graph')
    })
    it('produces correct initial state', () => {
      let newStore = createStore(graphReducer)
      expect(newStore.getState().type).to.deep.equal([])
    })
  })
})
