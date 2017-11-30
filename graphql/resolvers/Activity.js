const db = require('../connectors')
const findOrCreateLocation = require('./findOrCreateLocation')

const Activity = {
  Activity: {
    itinerary (activity) {
      return activity.getItinerary()
    },
    location (activity) {
      return activity.getLocation()
    },
    attachments (activity) {
      return activity.getAttachments()
    }
  },
  Query: {
    findActivity: (__, data) => {
      return db.Activity.findById(data.id)
    }
  },
  Mutation: {
    createActivity: (__, data) => {
      console.log('attachments array', data.attachments)
      var newActivity = {}
      Object.keys(data).forEach(key => {
        if (key !== 'googlePlaceData' && key !== 'LocationId') {
          newActivity[key] = data[key]
        }
      })
      if (data.googlePlaceData) {
        return findOrCreateLocation(data.googlePlaceData)
          .then(id => {
            newActivity.LocationId = id
            return db.Activity.create(newActivity)
              .then(created => {
                data.attachments.forEach(fileName => {
                  return db.Attachment.create({ActivityId: created.id, fileName: fileName})
                })
                return created.id
              })
              .then((createdId) => {
                return db.Activity.findById(createdId)
              })
          })
      } else if (data.LocationId) {
        newActivity.LocationId = data.LocationId
        return db.Activity.create(newActivity)
      } else {
        return db.Activity.create(newActivity)
          .then(created => {
            data.attachments.forEach(fileName => {
              return db.Attachment.create({ActivityId: created.id, fileName: fileName})
            })
            return created.id
          })
          .then((createdId) => {
            return db.Activity.findById(createdId)
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

      if (data.googlePlaceData) {
        return findOrCreateLocation(data.googlePlaceData)
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
      return db.Activity.destroy({where: {id: data.id}, individualHooks: true})
    }
  }
}
module.exports = Activity
