import {gotGraph} from '../store/graph'
import store from '../store'

const finalDecision = (columnData, scatterData, type, columns) => {
  console.log('I am at final decision func')
  let testData = {
    type: type,
    columns: columns,
    data: columnData,
    scatterData: scatterData
  }
  store.dispatch(gotGraph(testData))
}

function findColumnData(parsedData, column1name, column2name) {
  let dict = {}
  dict[column1name] = []
  dict[column2name] = []

  parsedData.forEach(obj => {
    for (let key in obj) {
      if (key === column1name) {
        dict[column1name].push(obj[key])
      } else if (key === column2name) {
        dict[column2name].push(obj[key])
      }
    }
  })
  console.log(dict)
  return dict
}

function findScatterData(parsedData, column1name, column2name) {
  let scatter = []

  parsedData.forEach(obj => {
    scatter.push({
      x: parseInt(obj[column1name]),
      y: parseInt(obj[column2name])
    })
  })
  return scatter
}

export const decisionTree = (parsedData, column1, column2, option) => {
  const columnData = findColumnData(parsedData, column1, column2)
  let scatterData = findScatterData(parsedData, column1, column2)
  let type = ['pie', 'bar']
  let columns = [column1, column2]

  finalDecision(columnData, scatterData, type, columns)
}
