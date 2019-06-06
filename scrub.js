const log = console.log
require('es6-promise').polyfill()
require('isomorphic-fetch')
const _ = require('lodash')
const cheerio = require('cheerio')


/**
 * Bars
 * Neighborhoods
 * Specials Today
 * Specials By Day
 * Bars In Neighborhood
 * Specials By Neighborhood
 *  https://www.smalltabs.com/browse.php?neighborhood=Edgewater
 *  then browse each Bar in List eg https://www.smalltabs.com/details.php?id=620
 * Specials By Bar
 * Recently Added
 * Recently Updated
 */

 const domain = 'http://smalltabs.com/'

async function Bars () {
  const text = await (await fetch(`${domain}`)).text()
  const $ = cheerio.load(text)

  const bars = $('.sidebar').find('select[name="name"]')
    .children()
    .map(function(i, el) {
      // this === el
      return {
        small_tabs_link: $(this).val(), 
        name: $(this).text()
      };
    }).get()

  return bars
}

async function Neighborhoods () {
  const text = await (await fetch(`${domain}`)).text()
  const $ = cheerio.load(text)

  const neighborhoods = $('.sidebar').find('select[name="neighborhood"]')
    .children()
    .map(function(i, el) {
      // this === el
      return {
        small_tabs_link: $(this).val(), 
        name: $(this).text()
      }
    }).get()

  return neighborhoods
}

async function BarsByNeighborhood (neighborhoodId) {
  const text = await (await fetch(`${domain}/${neighborhoodId}`)).text()
  const $ = cheerio.load(text)

  const bars = $('.specials')
    .children()
    .map(function(i, el) {
      // this === el
      return {
        name: $(this).find('h3').text(),
        location: $(this).find('.meta').text(),
        small_tabs_link: $(this).attr('href')
      };
    }).get()

    return bars
}

async function BarsByNeighborhoodName (neighborhood) {
  const text = await (await fetch(`${domain}browse.php?neighborhood=${encodeURIComponent(neighborhood)}`)).text()
  const $ = cheerio.load(text)

  const bars = $('.specials')
    .children()
    .map(function(i, el) {
      // this === el
      return {
        name: $(this).find('h3').text(),
        location: $(this).find('.meta').text()
      };
    }).get()

    return bars
}


async function SpecialsByBar (id) {
  const text = await (await fetch(`${domain}${id}`)).text()
  const $ = cheerio.load(text)

  const $specials = $('.specials')
  const last_updated = $specials.find('.date').text()

  const specials = $specials
    .children('.special')
    .map(function(i, el) {
      // this === el
      const day = $(el).find('h3').text()
    

      return {
        [day]: $(el).find('ul')
      .children().map(function(i, el2) {
        if ( $(el2).text() !== 'None') {
          return {
            special: $(el2).text(),
            type: $(el2).attr('class')
          }
        }
      }).get() }

    }).get()
    

    return {specials, last_updated}
}

async function SocialsByBar (id) {
  const text = await (await fetch(`${domain}${id}`)).text()
  const $ = cheerio.load(text)

  const socials = $('.social ul')
    .children()
    .map(function(i, el) {
      // this === el
      return {
        social: $(this).text(),
        link: $(this).find('a').attr('href')
      };
    }).get()

    return socials
}

async function SpecialsToday (neighborhood) {

}

async function SpecialsByDay (day) {
  const text = await (await fetch(`${domain}/index.php?day=${day}`)).text()
  const $ = cheerio.load(text)

  const specials = $('.specials')
    .children()
    .map(function(i, el) {
      // this === el
      return $(this).text();
    }).get()

    return specials
}

async function SpecialsByNeighborhood (neighborhood, day) {
  let str
  if (day) {
    str = `${domain}/sort.php?neighborhood=${encodeURIComponent(neighborhood)}&day=${day}`
  } else {
    
    str = `${domain}/sort.php?neighborhood=${encodeURIComponent(neighborhood)}`
  }
  const text = await (await fetch(str)).text()
  const $ = cheerio.load(text)

  const specials = $('.specials')
    .children()
    .map(function(i, el) {
      // this === el
      return $(this).text();
    }).get()

    return specials
}

function getBarIdByName (bars, name) {
  return _.find(bars, (val) => val.name === name)
}


async function RecentlyAdded () {
  const text = await (await fetch('${domain}')).text()
  const $ = cheerio.load(text)

  const recent = $('.recently_added ul')
    .children()
    .map(function(i, el) {
      // this === el
      return $(this).text();
    }).get()

    return recent
}

async function RecentlyUpdated () {
  const text = await (await fetch(`${domain}`)).text()
  const $ = cheerio.load(text)

  const recent = $('.recently_updated ul')
    .children()
    .map(function(i, el) {
      // this === el
      return $(this).text();
    }).get()

    return recent
}





module.exports = {
  Bars,
  Neighborhoods,
  RecentlyAdded,
  RecentlyUpdated,
  BarsByNeighborhood,
  BarsByNeighborhoodName,
  SocialsByBar,
  SpecialsByBar,
  SpecialsByDay,
  SpecialsToday,
  SpecialsByNeighborhood,
  getBarIdByName
}