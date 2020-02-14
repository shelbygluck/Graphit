const chai = require('chai')
const expect = chai.expect

const {average, sum} = require('../averageAndSum')

let labels = ['NY', 'NY', 'NY', 'CT', 'CT', 'CT', 'OH']
let labels2 = ['NC', 'NY', 'OH', 'KY', 'NJ', 'CT', 'MA']
let data = [1, 2, 3, 4, 5, 6, 7]
let strData = ['1', '2', '3', '4', '5', '6', '7']

describe('average', () => {
  it('averages numbers for data with repetitive labels', () => {
    expect(average(labels, data)).to.deep.equal([['NY', 'CT', 'OH'], [2, 5, 7]])
  })
  it('parses string integers', () => {
    expect(average(labels, strData)).to.deep.equal([
      ['NY', 'CT', 'OH'],
      [2, 5, 7]
    ])
  })
  it('returns the original arrays if no duplicates are passed in', () => {
    expect(average(labels2, data)).to.deep.equal([
      ['NC', 'NY', 'OH', 'KY', 'NJ', 'CT', 'MA'],
      [1, 2, 3, 4, 5, 6, 7]
    ])
  })
})

describe('sum', () => {
  it('sums numbers for data with repetitive labels', () => {
    expect(sum(labels, data)).to.deep.equal([['NY', 'CT', 'OH'], [6, 15, 7]])
  })
  it('parses string integers', () => {
    expect(sum(labels, strData)).to.deep.equal([['NY', 'CT', 'OH'], [6, 15, 7]])
  })
  it('returns the original arrays if no duplicates are passed in', () => {
    expect(sum(labels2, data)).to.deep.equal([
      ['NC', 'NY', 'OH', 'KY', 'NJ', 'CT', 'MA'],
      [1, 2, 3, 4, 5, 6, 7]
    ])
  })
})
