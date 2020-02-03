const router = require('express').Router()
const multer = require('multer')
const parse = require('csv-parse/lib/sync')
const storage = multer.memoryStorage()
const upload = multer({storage: storage}).single('file')
const csv = require('csv-parser')

router.post('/', upload, async (req, res, next) => {
  const csvString = req.file.buffer.toString()
  const jsonData = parse(csvString, {
    columns: true, //infers that first line is column names
    skip_empty_lines: true
  })
  console.log(typeof jsonData)

  res.send('data posted!')
})

module.exports = router
