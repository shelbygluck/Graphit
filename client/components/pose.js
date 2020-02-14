import React, {Component} from 'react'
import Example from './poses/firstPose'
import Example2 from './poses/fastPose'
import Example3 from './poses/tallPose'
import Example4 from './poses/newPose'
import Example5 from './poses/nextPose'
import Example6 from './poses/switchPose'

class Pose extends Component {
  render() {
    return (
      <div className="animationContainer">
        <Example />
        <Example2 />
        <Example5 />
        <Example6 />
        <Example4 />
        <Example />
        <Example5 />
        <Example4 />
        <Example6 />
        <Example3 />
        <Example />
        <Example2 />
        <Example4 />
        <Example3 />
        <Example5 />
        <Example4 />
        <Example3 />
        <Example6 />
        <Example />
        <Example2 />
        <Example4 />
        <Example5 />
        <Example2 />
        <Example3 />
        <Example4 />
        <Example6 />
        <Example5 />
        <Example />
        <Example />
      </div>
    )
  }
}

export default Pose
