const db = require('../connectors')
const airports = require('../../data/airports.json')
const fetch = require('node-fetch')
const findOrCreateLocation = require('./findOrCreateLocation')

// this fxn takes in IATA code and returns found/created LocationId

function findOrCreateAirportLocation (iata) {
  var airport = airports.find(row => {
    if (row.iata === iata) {
      return row
    }
  })

  var apiKey = 'AIzaSyDwlTicqOxDlB2u3MhiEusUJyo_QQy-MZU'

  var query = airport.name
  var region = airport.countryCode
  var placeSearchUri = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${apiKey}&query=${query}&region=${region}&type=airport`

  var placeId = fetch(placeSearchUri)
    .then(response => {
      return response.json()
    })
    .then(json => {
      // console.log('json', json)
      return json.results[0].place_id //take first result (typically only 1)
    })
    .catch(err => console.log(err))

  var googlePlaceData = placeId
    .then(placeId => {
      var placeDetailsUri = `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&placeid=${placeId}`

      return fetch(placeDetailsUri)
        .then(response => {
          return response.json()
        })
        .then(json => {
          // console.log('details', json)
          var googlePlaceData = {
            placeId: placeId,
            countryCode: region,
            name: json.result.name,
            latitude: json.result.geometry.location.lat,
            longitude: json.result.geometry.location.lng,
            address: json.result.formatted_address
          }
          return googlePlaceData
        })
        .catch(err => console.log(err))
    })

  return googlePlaceData.then(googlePlaceData => {
    return findOrCreateLocation(googlePlaceData)
      .then(id => {
        return id
      })
  })
}

module.exports = findOrCreateAirportLocation
