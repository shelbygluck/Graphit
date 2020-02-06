const chai = require('chai')
const expect = chai.expect

const {average, sum} = require('../averageAndSum')

let data = ['NY', 'NY', 'NY', 'CT', 'CT', 'CT', 'OH']
let labels = [1, 2, 3, 4, 5, 6, 7]

// average(arr1, arr2)
// sum(arr1, arr2)
describe('average', () => {
  it('averages numbers for data with repetitive labels', () => {
    expect(average(labels, data)).to.deep.equal(4)
  })
})
