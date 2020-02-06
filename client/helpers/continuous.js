// Discrete data is counted, can only take certain fixed values (dice), finite
// Continuous data is measured, can take any value (weight), infinite
//this function takes the column NAME and returns true for continuous and false for discrete

const names = require('./extras/examples')

const isContinuous = function(columnName) {
  for (let i = 0; i < names.length; i++) {
    if (columnName.includes(names[i])) {
      console.log('FOUND IT')
      return true
    }
  }
  return false
}

module.exports = {isContinuous}
