import {gotGraph} from '../store/graph'
import store from '../store'

const finalDecision = () => {
  console.log('I am at final decision func')
  let testData = {
    type: ['pie', 'bar'],
    data: {
      column1: ['data1', 'data2'],
      column2: ['data3', 'data4']
    }
  }
  store.dispatch(gotGraph(testData))
}

export const decisionTree = () => {
  finalDecision()
}
