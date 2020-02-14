/* eslint-disable no-unused-vars */
'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {SavedChart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'thePug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'TheDog',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const saved = await Promise.all([
    SavedChart.create({
      name: 'NYC Average Temperature by Month',
      type: 'line',
      column1: [38, 42, 50, 61, 71, 79, 84, 83, 75, 64, 54, 43],
      column2: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      selectedColumns: ['High °F', 'Month'],
      imageURL: '/line.png',
      userId: 1
    }),
    SavedChart.create({
      name: 'Height vs. Weight Scatterplot',
      type: 'scatter',
      column1: [
        74,
        68,
        70,
        72,
        66,
        66,
        64,
        71,
        72,
        69,
        69,
        72,
        62,
        75,
        70,
        67,
        71,
        65
      ],
      column2: [
        180,
        176,
        165,
        177,
        134,
        125,
        131,
        168,
        185,
        153,
        149,
        173,
        108,
        170,
        155,
        145,
        186,
        141
      ],
      selectedColumns: ['HEIGHT (IN)', 'WEIGHT'],
      imageURL: '/scatter.jpg',
      userId: 1
    }),
    SavedChart.create({
      name: 'NYC Restaurants by Borough',
      type: 'bar',
      column2: [
        'The Bronx',
        'Brooklyn',
        'Manhattan',
        'Queens',
        'Staten Island'
      ],
      column1: [2396, 6646, 10625, 5999, 976],
      selectedColumns: ['Restaurants', 'Borough'],
      userId: 1
    }),
    SavedChart.create({
      name: 'Favorite Color',
      type: 'pie',
      column2: ['Navy', 'Green', 'Pink', 'Baby Blue', 'Peach'],
      column1: [14, 66, 40, 53, 6],
      selectedColumns: ['Number', 'Color'],
      userId: 1
    }),
    SavedChart.create({
      name: 'NYC Average Temperature by Month',
      type: 'line',
      column1: [38, 42, 50, 61, 71, 79, 84, 83, 75, 64, 54, 43],
      column2: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      selectedColumns: ['High °F', 'Month'],
      imageURL: '/line.png',
      userId: 2
    }),
    SavedChart.create({
      name: 'Height vs. Weight Scatterplot',
      type: 'scatter',
      column1: [
        74,
        68,
        70,
        72,
        66,
        66,
        64,
        71,
        72,
        69,
        69,
        72,
        62,
        75,
        70,
        67,
        71,
        65
      ],
      column2: [
        180,
        176,
        165,
        177,
        134,
        125,
        131,
        168,
        185,
        153,
        149,
        173,
        108,
        170,
        155,
        145,
        186,
        141
      ],
      selectedColumns: ['HEIGHT (IN)', 'WEIGHT'],
      imageURL: '/scatter.jpg',
      userId: 2
    }),
    SavedChart.create({
      name: 'NYC Restaurants by Borough',
      type: 'bar',
      column2: [
        'The Bronx',
        'Brooklyn',
        'Manhattan',
        'Queens',
        'Staten Island'
      ],
      column1: [2396, 6646, 10625, 5999, 976],
      selectedColumns: ['Restaurants', 'Borough'],
      userId: 2
    }),
    SavedChart.create({
      name: 'Favorite Color',
      type: 'pie',
      column2: ['Navy', 'Green', 'Pink', 'Baby Blue', 'Peach'],
      column1: [14, 66, 40, 53, 6],
      selectedColumns: ['Number', 'Color'],
      userId: 2
    })
  ])

  console.log(`seeded successfully`)
}

async function runSeed() {
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

if (module === require.main) {
  runSeed()
}

module.exports = seed
