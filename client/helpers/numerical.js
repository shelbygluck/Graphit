const numbers = '1234567890.%$'

const isNumerical = function(data) {
  data[0].forEach(char => {
    if (!numbers.includes(char)) {
      return false
    }
  })
  return true
}

module.exports = {isNumerical}
