const helper = (labels, data) => {
  let dict = {}

  for (let i = 0; i < labels.length; i++) {
    let label = labels[i]
    if (Object.keys(dict).includes(label)) {
      dict[label].push(data[i])
    } else {
      dict[label] = []
      dict[label].push(data[i])
    }
  }
  return dict
}

const average = (arr1, arr2) => {
  let dict = helper(arr1, arr2)
  let labels = []
  let data = []
  let keys = Object.keys(dict)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let sum = 0

    for (let j = 0; j < dict[key].length; j++) {
      sum += parseInt(dict[key][j], 10)
    }
    labels.push(key)
    data.push(sum / dict[key].length)
  }
  return [labels, data]
}

const averageColumnData = (columnData, columns) => {
  let acd = {}
  let col0 = columnData[columns[0]]
  let col1 = columnData[columns[1]]
  let avgs = average(col1, col0)
  acd[columns[0]] = avgs[1]
  acd[columns[1]] = avgs[0]
  return acd
}

module.exports = {
  averageColumnData
}
