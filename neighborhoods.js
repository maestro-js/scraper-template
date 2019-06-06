const log = console.log
require('dotenv').config()
require('es6-promise').polyfill()
// require('isomorphic-fetch')
const fetch = require('@zeit/fetch-retry')(require('node-fetch'))
const _ = require('lodash')
var fs     = require('fs')

const scrub = require('./scrub')


async function run() {
  const neighborhoods = await scrub.Neighborhoods()
  let cleanNeighborhoods = _.filter(neighborhoods, (n) => {
    return n.name != 'Browse by Neighborhood'
  })

  // log(barList)
  fs.writeFileSync('datas/neighborhoods.json', JSON.stringify(cleanNeighborhoods, null, 2))

  const neighborhoodRows = cleanNeighborhoods
  // knex.batchInsert('neighborhoods', neighborhoodRows)
 
}

run()