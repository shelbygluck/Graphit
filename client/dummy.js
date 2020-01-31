const dummyJson = [
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
]

function getColumns(dummyJson) {
  let keys = Object.keys(dummyJson[1])
  console.log('KEYS', keys)
  return keys
}

function parse(dummyJson, columns) {
  let dict = {}

  columns.forEach(key => {
    dict[key] = []
  })

  dummyJson.forEach(obj => {
    for (let key in obj) {
      if (columns.includes(key)) {
        dict[key].push(obj[key])
      }
    }
  })
  console.log(dict)
  return dict
}

getColumns(dummyJson)
parse(dummyJson, ['AGE', 'STATE'])
