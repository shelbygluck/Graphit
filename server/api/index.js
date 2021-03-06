const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/userData', require('./userDatas'))
router.use('/charts', require('./charts'))
router.use('/saved', require('./savedChart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
