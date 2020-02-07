const chai = require('chai')
const expect = chai.expect

const {findMean, findSD, isSDLow} = require('../sd')

const data = [1, 4, 6, -100, 9, 2, 0.2]

var assert = require('assert')
describe('Standard Deviation', function() {
  describe('#findMean()', function() {
    it('returns correct mean of array of data', function() {
      const returnVal = Math.round(findMean(data))
      assert.equal(-11, returnVal)
    })
  })
  describe('#findSD()', function() {
    it('returns correct standard dev of array of data', function() {
      const returnVal = Math.round(findSD(data, findMean(data)))
      assert.equal(36, returnVal)
    })
  })
  describe('#isSDLow', function() {
    it('returns a boolean on whether SD is relatively high or low', function() {
      assert.equal(false, isSDLow(data))
    })
  })
})
