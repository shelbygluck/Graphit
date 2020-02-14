const {isContinuous} = require('../continuous')

var assert = require('assert')
describe('Continuous or Discrete', function() {
  describe('#isContinuous', function() {
    it('returns boolean determining continuous status', function() {
      assert.equal(true, isContinuous('year'))
    })
  })
})
