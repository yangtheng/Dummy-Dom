const db = require('../connectors')

// this fxn will findOrCreateLocation and return LocationId
function findOrCreateLocation (data) {
  if (data.LocationId) {
    return data.LocationId
  } else if (data.googlePlaceData) {
    var google = data.googlePlaceData
    return db.Location.find({where: { placeId: google.placeId }})
      .then(found => {
        return found.id
      })
      .catch(() => {
        return db.Country.find({where: { code: google.countryCode }})
          .then(country => {
            return db.Location.create({
              placeId: google.placeId,
              name: google.name,
              CountryId: country.id,
              latitude: google.latitude,
              longitude: google.longitude,
              openingHour: google.openingHour,
              closingHour: google.closingHour,
              address: google.address
            })
            .then(createdLocation => {
              return createdLocation.id
            })
          })
      }) // close catch
  } // close else
} // close fxn definition

module.exports = findOrCreateLocation
