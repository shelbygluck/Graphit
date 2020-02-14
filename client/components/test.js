/* eslint-disable radix */
/* eslint-disable complexity */
import {gotGraph} from '../store/graph'
import store from '../store'
import {isNumerical} from '../helpers/numerical'
import {isContinuous} from '../helpers/continuous'
import {isSDLow} from '../helpers/sd'
import {averageColumnData} from '../helpers/averageColumnData'
import {isUnique} from '../helpers/isUnique'

const finalDecision = (columnData, scatterData, type, columns, averageCD) => {
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
    return ['avg-bar', 'avg-pie']
  } else if (option === 'compares to') {
    if (isNumerical(columnData[column1]) && isNumerical(columnData[column2])) {
      if (isUnique(columnData[column2])) {
        return ['scatter', 'line', 'bar']
      }
      return ['scatter', 'avg-line', 'avg-bar']
    } else {
      if (isUnique(columnData[column2])) {
        return ['bar', 'line']
      }
      return ['avg-bar', 'avg-line']
    }
  } else if (option === 'is influenced by') {
    if (!isNumerical(columnData[column1])) {
      console.log('DECISION 1') // scatter does NOT work for this data
      if (isUnique(columnData[column2])) {
        return ['bar', 'line', 'pie']
      }
      return ['avg-bar', 'avg-line', 'avg-pie']
    }

    if (!isContinuous(columnData[column1])) {
      console.log('DECISION 2')
      if (
        isNumerical(columnData[column1]) &&
        isNumerical(columnData[column2])
      ) {
        if (isUnique(columnData[column2])) {
          return ['scatter', 'line', 'bar']
        }
        return ['scatter', 'avg-line', 'avg-bar']
      } else {
        if (isUnique(columnData[column2])) {
          return ['bar', 'line']
        }
        return ['avg-bar', 'avg-line']
      }
    }

    if (isSDLow(columnData[column1])) {
      console.log('DECISION 3')
      if (isUnique(columnData[column2])) {
        return ['line', 'bar']
      }
      return ['avg-line', 'avg-bar']
    }

    if (isUnique(columnData[column2])) {
      return ['bar', 'line']
    }
    console.log('DECISION 4')
    return ['avg-bar', 'avg-line']
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
}
