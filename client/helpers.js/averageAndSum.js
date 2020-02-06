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

export const average = (arr1, arr2) => {
  let dict = helper(arr1, arr2)
  let labels = []
  let data = []
  let keys = Object.keys(dict)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let sum = 0
    for (let j = 0; i < dict[key].length; j++) {
      sum += dict[key][j]
    }
    labels.push(key)
    data.push(sum / dict[key].length)
  }
  console.log('AVERAGE')
  console.log(labels)
  console.log(data)
  return [labels, data]
}

export const sum = (arr1, arr2) => {
  let dict = helper(arr1, arr2)
  let labels = []
  let data = []
  let keys = Object.keys(dict)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let summ = 0
    for (let j = 0; i < dict[key].length; j++) {
      summ += dict[key][j]
    }
    labels.push(key)
    data.push(summ)
  }
  console.log('SUM')
  console.log(labels)
  console.log(data)
  return [labels, data]
}

//FOR TESTING//
// const arr1 = ['NY', 'NY', 'NY', 'ny', 'CT', 'ct', 'OH']
// const arr2 = [1, 2, 3, 4, 5, 6, 7]

// average(arr1, arr2)
// sum(arr1, arr2)