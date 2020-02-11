const {isContinuous} = require('../continuous')

const data = [1, 4, 6, -100, 9, 2, 0.2]

var assert = require('assert')
describe('Continuous or Discrete', function() {
  describe('#isContinuous', function() {
    it('returns boolean determining continuous status', function() {
      assert.equal(true, isContinuous('year'))
    })
  })
})
