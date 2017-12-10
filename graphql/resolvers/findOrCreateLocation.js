const db = require('../connectors')

// this fxn takes in googlePlaceData obj return LocationId
function findOrCreateLocation (google) {
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
              openingHours: google.openingHours,
              address: google.address
            })
            .then(createdLocation => {
              return createdLocation.id
            })
          })
      }) // close catch
} // close fxn definition

module.exports = findOrCreateLocation
