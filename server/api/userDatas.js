const router = require('express').Router()
const {User} = require('../db/models')
const {UserData} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userDatas = await UserData.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
    })
    res.json(userDatas)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userDatas = await UserData.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userDatas)
  } catch (err) {
    next(err)
  }
})
