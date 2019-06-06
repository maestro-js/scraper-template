const log = console.log
require('dotenv').config()
require('es6-promise').polyfill()
require('isomorphic-fetch')
const _ = require('lodash')
var fs     = require('fs')

const scrub = require('./scrub')





async function run() {
  
  let barsByNeighborhood = JSON.parse(fs.readFileSync(__dirname + '/datas/bars.json'))

  var processedCounter = 0;
  const barRows = _.flatMap(barsByNeighborhood, (bars, neighborhood) => {
    return _.map(bars, (bar) => {
      return _.assign({}, bar, {neighborhood: neighborhood})
    })
  })
  
  console.log(barRows)
  fs.writeFileSync(__dirname + '/datas/bars-flat.json', JSON.stringify(barRows, null, 2))
 
  // knex.batchInsert('bars', barRows)
 

}

run()