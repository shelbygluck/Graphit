const router = require('express').Router()
const multer = require('multer')
const parse = require('csv-parse/lib/sync')
const storage = multer.memoryStorage()
const upload = multer({storage: storage}).single('file')
const {UserData} = require('../db/models')

router.post('/', upload, async (req, res, next) => {
  const csvString = req.file.buffer.toString()
  const jsonData = parse(csvString, {
    columns: true,
    // eslint-disable-next-line camelcase
    skip_empty_lines: true
  })
  const columns = req.body.selectedColumns.split(',')
  try {
    const response = await UserData.create({
      rawData: jsonData,
      selectedColumns: columns,
      userId: req.user.id
    })
    res.send(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
