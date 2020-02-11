const chai = require('chai')
const expect = chai.expect

const {averageColumnData} = require('../averageColumnData')

let cd = {
  CONTRIBUTIONS: [1, 2, 3, 4, 5, 6, 7, 8],
  NAMES: [
    'Celia',
    'Celia',
    'Celia',
    'Celia',
    'Shelby',
    'Shelby',
    'Ha Na',
    'Celia'
  ]
}
let strData = {
  CONTRIBUTIONS: ['1', '2', '3', '4', '5', '6', '7', '8'],
  NAMES: [
    'Celia',
    'Celia',
    'Celia',
    'Celia',
    'Shelby',
    'Shelby',
    'Ha Na',
    'Celia'
  ]
}
let noDups = {
  CONTRIBUTIONS: [1, 2, 3, 4],
  NAMES: ['Celia', 'Shelby', 'Ha Na', 'Anastasiia']
}
let cols = ['CONTRIBUTIONS', 'NAMES']

describe('averageColumnData', () => {
  it('averages numbers for data with repetitive labels', () => {
    expect(averageColumnData(cd, cols)).to.deep.equal({
      CONTRIBUTIONS: [3.6, 5.5, 7],
      NAMES: ['Celia', 'Shelby', 'Ha Na']
    })
  })
  it('parses string integers', () => {
    expect(averageColumnData(strData, cols)).to.deep.equal({
      CONTRIBUTIONS: [3.6, 5.5, 7],
      NAMES: ['Celia', 'Shelby', 'Ha Na']
    })
  })
  it('returns the original arrays if no duplicates are passed in', () => {
    expect(averageColumnData(noDups, cols)).to.deep.equal({
      CONTRIBUTIONS: [1, 2, 3, 4],
      NAMES: ['Celia', 'Shelby', 'Ha Na', 'Anastasiia']
    })
  })
})
