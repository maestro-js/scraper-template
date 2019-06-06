const log = console.log
require('dotenv').config()
require('es6-promise').polyfill()
require('isomorphic-fetch')
const _ = require('lodash')
var fs     = require('fs')

const scrub = require('./scrub')

async function run() {
  // const bars = await scrub.Bars()
  // log(bars)
  // log()
  const neighborhoods = await scrub.Neighborhoods()
  log(neighborhoods)


  // const barsLocations = await Promise.all(_.map(neighborhoods, async (neighborhood) => {
  //   return await scrub.BarsByNeighborhood(neighborhood)
  // }))

  // log(barsLocations)
  // _.forEach(neighborhoods, async (neighborhood, i) => {
  //   log(neighborhood, await scrub.BarsByNeighborhood(neighborhood))
  // })

  // log(await scrub.SpecialsByNeighborhood('Andersonville'))
  // log(await scrub.BarsByNeighborhood('Andersonville'))
  // log(await scrub.RecentlyAdded())
  // log(await scrub.RecentlyUpdated())
  // log(scrub.getBarIdByName(bars, 'Bar 63'))
  // log(await scrub.SpecialsByBar(getBarIdByName(bars, 'Bar 63').id))
}

run()