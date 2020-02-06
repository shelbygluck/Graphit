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
  console.log('HERE')
  console.log(keys)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let sum = 0
    console.log('key', key)
    console.log(dict[key].length)
    for (let j = 0; j < dict[key].length; j++) {
      sum += parseInt(dict[key][j])
    }
    console.log('here')
    labels.push(key)
    data.push(sum / dict[key].length)
  }
  console.log('AVERAGE')
  console.log(labels)
  console.log(data)
  return [labels, data]
}

const sum = (arr1, arr2, columnNames) => {
  let dict = helper(arr1, arr2)
  let labels = []
  let data = []
  let keys = Object.keys(dict)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let summ = 0
    for (let j = 0; j < dict[key].length; j++) {
      summ += parseInt(dict[key][j])
    }
    labels.push(key)
    data.push(summ)
  }

  console.log('SUM')
  console.log(labels)
  console.log(data)
  return [labels, data]
}

module.exports = {
  average,
  sum
}
