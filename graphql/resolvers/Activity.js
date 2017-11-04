const db = require('../connectors')

const Activity = {
  Activity: {
    itinerary (activity) {
      return activity.getItinerary()
    },
    location (activity) {
      return activity.getLocation()
    }
  },
  Query: {
    findActivity: (__, data) => {
      return db.Activity.findById(data.id)
    }
  },
  Mutation: {
    createActivity: (__, data) => {
      // this helper function finds or create location and return LocationId
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
      } // close helper fxn

      return findOrCreateLocation(data)
        .then(LocationId => {
          console.log('returning LocationId', LocationId)
          var newActivity = {}
          Object.keys(data).forEach(key => {
            if (key !== 'googlePlaceData' && key !== 'LocationId') {
              newActivity[key] = data[key]
            }
          })
          newActivity.LocationId = LocationId
          return db.Activity.create(newActivity)
        })
    },
    updateActivity: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData') {
          updates[key] = data[key]
        }
      })
      console.log('updates', updates)

      if (data.googlePlaceData) {
        return db.Location.find({where: {placeId: data.googlePlaceData.placeId}})
        .then(found => {
          updates.LocationId = found.id
          return db.Activity.findById(data.id)
            .then(found => {
              return found.update(updates)
            })
        })
        .catch(() => {
          var CountryId = null
          return db.Country.find({where: {code: data.googlePlaceData.countryCode}})
            .then(found => {
              CountryId = found.id
              return db.Location.create({
                placeId: data.googlePlaceData.placeId,
                name: data.googlePlaceData.name,
                CountryId: CountryId,
                latitude: data.googlePlaceData.latitude,
                longitude: data.googlePlaceData.longitude,
                openingHour: data.googlePlaceData.openingHour,
                closingHour: data.googlePlaceData.closingHour,
                address: data.googlePlaceData.address
              })
                .then(createdLocation => {
                  updates.LocationId = createdLocation.id
                  return db.Activity.findById(data.id)
                    .then(found => {
                      return found.update(updates)
                    })
                })
            })
        })
      } else {
        return db.Activity.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
      }
    },
    deleteActivity: (__, data) => {
      return db.Activity.destroy({where: {id: data.id}})
        .then(status => {
          return status
        })
    }
  }
}
module.exports = Activity
