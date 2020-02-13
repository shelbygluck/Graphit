/* eslint-disable radix */
/* eslint-disable complexity */
import {gotGraph} from '../store/graph'
import store from '../store'
import {isNumerical} from '../helpers/numerical'
import {isContinuous} from '../helpers/continuous'
import {isSDLow} from '../helpers/sd'
import {averageColumnData} from '../helpers/averageColumnData'

// const finalDecision = (columnData, scatterData, type, columns) => {
const finalDecision = (columnData, scatterData, type, columns, averageCD) => {
  console.log('I am at final decision func')
  let testData = {
    type: type,
    columns: columns,
    data: columnData,
    scatterData: scatterData,
    averageCD: averageCD
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

function chooseGraph(columnData, column1, column2, option) {
  if (option === 'is broken down by') {
    if (columnData[column2].length < 10 && isNumerical(columnData[column1])) {
      return ['pie', 'bar']
    }
    // return ['bar', 'pie']
    return ['avg-bar', 'avg-pie']
  } else if (option === 'compares to') {
    if (isNumerical(columnData[column1]) && isNumerical(columnData[column2])) {
      return ['scatter', 'line']
    } else {
      return ['bar', 'line']
    }
  } else if (option === 'is influenced by') {
    if (!isNumerical(columnData[column1])) {
      return ['scatter', 'bar']
    }
    if (!isContinuous(columnData[column1])) {
      return ['scatter', 'line']
    }
    if (isSDLow(columnData[column1])) {
      return ['line', 'bar']
    }
    return ['bar', 'line']
  }
}

export const decisionTree = (parsedData, column1, column2, option) => {
  let columnData = findColumnData(parsedData, column1, column2)

  let scatterData = findScatterData(parsedData, column1, column2)
  let type = chooseGraph(columnData, column1, column2, option)
  let columns = [column1, column2]
  if (!isNumerical(columnData[column1])) {
    columns = [column2, column1]
  }
  let averageCD = averageColumnData(columnData, columns)

  finalDecision(columnData, scatterData, type, columns, averageCD)
  // finalDecision(columnData, scatterData, type, columns)
}
