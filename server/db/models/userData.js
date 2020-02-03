const Sequelize = require('sequelize')
const db = require('../db')

const UserData = db.define('userData', {
  rawData: {
    type: Sequelize.TEXT,
    get: function() {
      return JSON.parse(this.getDataValue('rawData'))
    },
    set: function(val) {
      return this.setDataValue('rawData', JSON.stringify(val))
    }
  },
  selectedColumns: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = UserData
