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
  },
  imageURL: {
    type: Sequelize.STRING
  }
})

SavedChart.addHook('beforeCreate', (savedChart, options) => {
  if (savedChart.type === 'pie') {
    savedChart.imageURL = '/pie.png'
  } else if (savedChart.type === 'scatter') {
    savedChart.imageURL = '/scatter.jpg'
  } else if (savedChart.type === 'line') {
    savedChart.imageURL = '/line.png'
  } else if (savedChart.type === 'bar') {
    savedChart.imageURL = '/combo-chart.png'
  }
})

module.exports = SavedChart
