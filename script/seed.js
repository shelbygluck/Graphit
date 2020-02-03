'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {UserData} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const datas = await Promise.all([
    UserData.create({
      rawData: [
        {
          NAME: 'Jonathan Sims',
          DATE: '11/25/2029',
          AGE: '37',
          STATE: 'OH'
        },
        {NAME: 'Belle Cox', DATE: '01/29/1994', AGE: '28', STATE: 'IN'},
        {
          NAME: 'Calvin Estrada',
          DATE: '06/26/1924',
          AGE: '65',
          STATE: 'SC'
        },
        {NAME: 'Roy Wright', DATE: '04/04/1996', AGE: '41', STATE: 'OH'},
        {
          NAME: 'Mayme Howell',
          DATE: '08/22/1997',
          AGE: '23',
          STATE: 'AR'
        },
        {
          NAME: 'Emma Morgan',
          DATE: '12/24/2015',
          AGE: '54',
          STATE: 'AZ'
        },
        {
          NAME: 'Jayden Anderson',
          DATE: '03/12/2047',
          AGE: '52',
          STATE: 'AK'
        },
        {
          NAME: 'Dennis Tyler',
          DATE: '03/10/1978',
          AGE: '44',
          STATE: 'WA'
        },
        {
          NAME: 'Jackson Strickland',
          DATE: '05/28/1943',
          AGE: '61',
          STATE: 'UT'
        },
        {NAME: 'Henry Wise', DATE: '10/16/1919', AGE: '39', STATE: 'WA'}
      ],
      selectedColumns: ['AGE', 'STATE'],
      userId: 2
    }),
    UserData.create({
      rawData: [
        {
          NAME: 'Dennis Tyler',
          DATE: '03/10/1978',
          AGE: '44',
          STATE: 'WA'
        },
        {
          NAME: 'Jackson Strickland',
          DATE: '05/28/1943',
          AGE: '61',
          STATE: 'UT'
        },
        {NAME: 'Henry Wise', DATE: '10/16/1919', AGE: '39', STATE: 'WA'}
      ],
      selectedColumns: ['AGE', 'STATE'],
      userId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
