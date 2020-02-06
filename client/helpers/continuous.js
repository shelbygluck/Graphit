// Discrete data is counted, can only take certain fixed values (dice), finite
// Continuous data is measured, can take any value (weight), infinite
//this function take

const names = require('./extras/examples')

const isContinuous = function(columnName) {
  names.forEach(name => {
    if (columnName.includes(name)) {
      return true
    }
  })
  return false
}

module.exports = {isContinuous}
