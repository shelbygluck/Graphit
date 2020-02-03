import React from 'react'

import {Navbar, Upload} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="everything">
      <Navbar />
      <Routes />
      <Upload />
    </div>
  )
}

export default App
