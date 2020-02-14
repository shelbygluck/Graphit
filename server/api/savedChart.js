const router = require('express').Router()
const {SavedChart} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const response = await SavedChart.create({
      name: req.body.name,
      type: req.body.type,
      selectedColumns: req.body.columns,
      column1: req.body.columnData[req.body.columns[0]],
      column2: req.body.columnData[req.body.columns[1]],
      userId: req.user.id
    })
    res.send(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    let charts = await SavedChart.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.send(charts)
  } catch (error) {
    console.error(error)
  }
})

router.get('/chart/:id', async (req, res, next) => {
  try {
    let chart = await SavedChart.findOne({
      where: {
        id: req.params.id
      }
    })
    res.send(chart)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
