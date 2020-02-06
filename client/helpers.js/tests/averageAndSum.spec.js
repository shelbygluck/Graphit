const chai = require('chai')
const expect = chai.expect

const {average, sum} = require('../averageAndSum')

let labels = ['NY', 'NY', 'NY', 'CT', 'CT', 'CT', 'OH']
let data = [1, 2, 3, 4, 5, 6, 7]

// average(arr1, arr2)
// sum(arr1, arr2)
describe('average', () => {
  it('averages numbers for data with repetitive labels', () => {
    expect(average(labels, data)).to.deep.equal([['NY', 'CT', 'OH'], [2, 5, 7]])
  })
})

describe('sume', () => {
  it('sums numbers for data with repetitive labels', () => {
    expect(sum(labels, data)).to.deep.equal([['NY', 'CT', 'OH'], [6, 15, 7]])
  })
})
