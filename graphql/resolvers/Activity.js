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
      console.log('data', data)

      // if we know location has been saved before(bucket), createNewActivity immediately
      // else if found via searching, check if location has been saved before, find LocationId
      // if location has not been saved before, create new location first.

      if (data.LocationId) {
        console.log('locationId was given')
        var newActivity = {}
        Object.keys(data).forEach(key => {
          if (key !== 'googlePlaceData') {
            newActivity[key] = data[key]
          }
        })
        return db.Activity.create(newActivity)
      } else {
        console.log('locationId was not given')
        // extract google places object
        var googlePlaceData = data.googlePlaceData
        var LocationId = null
        // check db if google place id already exists
        return db.Location.find({where: {placeId: googlePlaceData.placeId}})
        .then(found => {
          LocationId = found.id
          console.log('Locationid', LocationId)
        })
        .catch(() => {
          console.log('location not found. creating row')
          var countryCode = googlePlaceData.countryCode
          var CountryId = null

          db.Country.find({where: {code: countryCode}})
          .then(found => {
            CountryId = found.id
          })
          .then(() => {
            db.Location.create({
              placeId: googlePlaceData.placeId,
              name: googlePlaceData.name,
              CountryId: CountryId,
              latitude: googlePlaceData.latitude,
              longitude: googlePlaceData.longitude,
              openingHour: googlePlaceData.openingHour,
              closingHour: googlePlaceData.closingHour,
              address: googlePlaceData.address
            })
            .then(created => {
              LocationId = created.id
              console.log('created LocationId', LocationId)
            })
          })
        })
        .then(() => {
          var newActivity = {}
          Object.keys(data).forEach(key => {
            if (key !== 'googlePlaceData') {
              newActivity[key] = data[key]
            }
          })
          newActivity.LocationId = LocationId
          return db.Activity.create(newActivity)
        })
      }
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
