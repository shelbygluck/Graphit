/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {UserData} = require('./index')

describe('UserData model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correctPassword', () => {
    let chart

    beforeEach(async () => {
      chart = await UserData.create({
        rawData:
          '[{"NAME":"Dennis Tyler","DATE":"03/10/1978","AGE":"44","STATE":"WA"},{"NAME":"Jackson Strickland","DATE":"05/28/1943","AGE":"61","STATE":"UT"},{"NAME":"Henry Wise","DATE":"10/16/1919","AGE":"39","STATE":"WA"}]',
        selectedColumns: ['age', 'state']
      })
    })

    it('fills rows of model', () => {
      expect(chart.selectedColumns[0]).to.be.equal('age')
    })

    it('stringifies data', () => {
      expect(chart.rawData).to.be.equal(
        '[{"NAME":"Dennis Tyler","DATE":"03/10/1978","AGE":"44","STATE":"WA"},{"NAME":"Jackson Strickland","DATE":"05/28/1943","AGE":"61","STATE":"UT"},{"NAME":"Henry Wise","DATE":"10/16/1919","AGE":"39","STATE":"WA"}]'
      )
    })
  })
})
