const names = require('./extras/examples')

const isContinuous = function(columnName) {
  for (let i = 0; i < names.length; i++) {
    if (columnName.includes(names[i])) {
      return true
    }
  }
  return false
}

module.exports = {isContinuous}
