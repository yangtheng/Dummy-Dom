const db = require('../connectors')
const findOrCreateLocation = require('./findOrCreateLocation')

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

      if (data.googlePlaceData) {
        return findOrCreateLocation(data)
          .then(LocationId => {
            updates.LocationId = LocationId
            return db.Activity.findById(data.id)
              .then(foundActivity => {
                return foundActivity.update(updates)
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
