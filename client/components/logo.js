import React from 'react'
import {Link} from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/">
      <div className="logo">
        Graph<span className="it">it</span>
      </div>
    </Link>
  )
}
export default Logo
