/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './navbar'
import store from '../store/index'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let navbar

  beforeEach(() => {
    navbar = shallow(<Navbar handleClick={{}} isLoggedIn={{}} store={store} />)
  })

  it('shows correct logged in status', () => {
    expect(navbar.contains('Login')).to.equal(false)
  })
})
