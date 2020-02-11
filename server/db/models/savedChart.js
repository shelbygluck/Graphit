const Sequelize = require('sequelize')
const db = require('../db')

const SavedChart = db.define('savedChart', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  column1: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  column2: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  selectedColumns: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = SavedChart
