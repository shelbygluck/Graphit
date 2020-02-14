/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {UserData} = require('../db/models')

describe('UserData get routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/userData/', () => {
    beforeEach(() => {
      return UserData.create({
        rawData:
          '[{"NAME":"Dennis Tyler","DATE":"03/10/1978","AGE":"44","STATE":"WA"},{"NAME":"Jackson Strickland","DATE":"05/28/1943","AGE":"61","STATE":"UT"},{"NAME":"Henry Wise","DATE":"10/16/1919","AGE":"39","STATE":"WA"}]',
        selectedColumns: ['age', 'state']
      })
    })

    it('GET /api/userData', async () => {
      const res = await request(app)
        .get('/api/userData')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].selectedColumns[0]).to.be.equal('age')
    })
  })
})
