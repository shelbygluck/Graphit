const {isNumerical} = require('../numerical')

const numData = [100, 4, 6, -100, 9, 2, 0.2]
const strData = ['Steven', 'Ryan', 'Laura']

var assert = require('assert')
describe('Numerical or Categorical', function() {
  describe('#isNumerical()', function() {
    it('returns boolean representing num status of data', function() {
      assert.equal(true, isNumerical(numData))
      assert.equal(false, isNumerical(strData))
    })
  })
})
