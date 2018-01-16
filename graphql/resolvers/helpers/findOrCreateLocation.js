const db = require('../../connectors')
const fetch = require('node-fetch')

// this fxn takes in googlePlaceData obj return LocationId
function findOrCreateLocation (google) {
  return db.Location.find({where: { placeId: google.placeId }})
      .then(found => {
        return found.id
      })
      .catch(() => {
        if (google.countryCode) {
          return db.Country.find({where: { code: google.countryCode }})
          .then(country => {
            return db.Location.create({
              placeId: google.placeId,
              name: google.name,
              telephone: google.telephone,
              CountryId: country.id,
              latitude: google.latitude,
              longitude: google.longitude,
              address: google.address,
              openingHours: google.openingHours,
              openingHoursText: google.openingHoursText
            })
            .then(createdLocation => {
              return createdLocation.id
            })
          })
        } else {
          // if country code doesnt exist. what if lat/lng etc doesnt exist
          console.log('reverse geocode to find countryCode')
          var latitude = google.latitude
          var longitude = google.longitude
          if (!latitude || !longitude) {
            console.log('errr lat lng missing')
            return
          }
          var apiKey = process.env.GOOGLE_API_KEY
          var reverseGeocodeUri = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${latitude},${longitude}`

          return fetch(reverseGeocodeUri)
            .then(response => {
              return response.json()
            })
            .then(json => {
              console.log(json)
              var countryCode = null
              json.results.forEach(e => {
                if (e.types.includes('country')) {
                  countryCode = e.address_components[0].short_name
                }
              })
              // console.log('country code', countryCode)

              return db.Country.find({where: { code: countryCode }})
              .then(country => {
                return db.Location.create({
                  placeId: google.placeId,
                  name: google.name,
                  telephone: google.telephone,
                  CountryId: country.id,
                  latitude: google.latitude,
                  longitude: google.longitude,
                  address: google.address,
                  openingHours: google.openingHours,
                  openingHoursText: google.openingHoursText
                })
                .then(createdLocation => {
                  return createdLocation.id
                })
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      }) // close catch
} // close fxn definition

module.exports = findOrCreateLocation
