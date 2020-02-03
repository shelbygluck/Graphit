const router = require('express').Router()
const multer = require('multer')
module.exports = router

router.post('/', async (req, res, next) => {
  console.log('############', req.body)
  res.send('data posted!')
})
