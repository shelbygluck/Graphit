/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {gotUserOptions} from './upload'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('upload thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    upload: {
      file: '',
      userOptions: ''
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
      await store.dispatch(gotUserOptions('is influenced by'))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_USER_OPTIONS')
    })
    it('fills store with correct data', async () => {
      await store.dispatch(gotUserOptions('is influenced by'))
      const actions = store.getActions()
      expect(actions[0].userOptions).to.be.equal('is influenced by')
    })
  })
})
