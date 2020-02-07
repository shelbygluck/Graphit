//standard deviation measures the spread of data
//final function returns true for low SD and false for high SD

const findMean = function(data) {
  return (
    data.reduce(function(a, b) {
      return Number(a) + Number(b)
    }) / data.length
  )
}

const findSD = function(data, mean) {
  let valueList = []
  data.forEach(value => {
    valueList.push(Math.pow(value - mean, 2))
  })
  const variance = findMean(valueList)
  return Math.sqrt(variance)
}

const isSDLow = function(data) {
  const mean = findMean(data)
  const SD = findSD(data, mean)
  const proportionOfMean = Math.abs(SD / mean)
  if (proportionOfMean < 0.2) {
    return true
  }
  return false
}

module.exports = {findMean, findSD, isSDLow}
