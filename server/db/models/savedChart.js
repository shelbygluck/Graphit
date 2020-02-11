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
    savedChart.imageURL =
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Floading.io%2Ficon%2Fna60o3&psig=AOvVaw0209wvX3onXqL2xvilkOaz&ust=1581539827802000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJi875GtyucCFQAAAAAdAAAAABAD'
  } else if (savedChart.type === 'scatter') {
    savedChart.imageURL =
      'https://cdn0.iconfinder.com/data/icons/presentation-add-on-2-twotone/48/Paul-33-512.png'
  } else if (savedChart.type === 'line') {
    savedChart.imageURL =
      'https://cdn3.vectorstock.com/i/1000x1000/18/07/growth-line-chart-icon-colored-symbol-premium-vector-23481807.jpg'
  } else if (savedChart.type === 'bar') {
    savedChart.imageURL =
      'https://cdn2.iconfinder.com/data/icons/flat-infographic-graphs-charts-vol-1/64/column_graph6-512.png'
  }
})

module.exports = SavedChart
