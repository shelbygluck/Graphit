const router = require('express').Router()
const {UserData} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userDatas = await UserData.findAll({})
    res.json(userDatas)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userDatas = await UserData.findAll({
      where: {
        userId: req.user.id
      }
    })
    const newestEntry = userDatas[userDatas.length - 1]
    res.send(newestEntry)
  } catch (err) {
    next(err)
  }
})
