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

SavedChart.addHook('beforeCreate', savedChart => {
  if (savedChart.type === 'pie') {
    savedChart.imageURL = '/pie.png'
  } else if (savedChart.type === 'avg-pie') {
    savedChart.imageURL = '/pie.png'
  } else if (savedChart.type === 'scatter') {
    savedChart.imageURL = '/scatter.png'
  } else if (savedChart.type === 'line') {
    savedChart.imageURL = '/line.png'
  } else if (savedChart.type === 'avg-line') {
    savedChart.imageURL = '/line.png'
  } else if (savedChart.type === 'bar') {
    savedChart.imageURL = '/combo-chart.png'
  } else if (savedChart.type === 'avg-bar') {
    savedChart.imageURL = '/combo-chart.png'
  }
})

module.exports = SavedChart
