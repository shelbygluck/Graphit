const numbers = '1234567890.%$'

//isNumerical takes a single column (array) of data and returns true if it is numerical, else returnns false
const isNumerical = function(data) {
  const first = data[0]
  for (let i = 0; i < first.length; i++) {
    if (!numbers.includes(first[i])) {
      return false
    }
  }
  return true
}

module.exports = {isNumerical}
