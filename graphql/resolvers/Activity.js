const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')

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
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'googlePlaceData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        var newActivity = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else if (data.LocationId) {
        temp.LocationId = data.LocationId
        newActivity = Promise.resolve(temp)
      } else if (!data.LocationId && !data.googlePlaceData) {
        newActivity = Promise.resolve(temp)
      }

      return newActivity.then(newActivity => {
        return db.Activity.create(newActivity)
          .then(created => {
            if (data.attachments) {
              data.attachments.forEach(info => {
                return db.Attachment.create({ActivityId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
              })
            }
            // need promise.all to ensure attachments finish
            return created.id
          })
          .then(createdId => {
            return db.Activity.findById(createdId)
          })
      })
    },
    updateActivity: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData') {
          temp[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        var updateObj = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else {
        updateObj = Promise.resolve(temp)
      }

      return updateObj.then(updateObj => {
        return db.Activity.findById(data.id)
          .then(found => {
            return found.update(updateObj)
          })
      })
    },
    deleteActivity: (__, data) => {
      return db.Activity.destroy({where: {id: data.id}, individualHooks: true})
    }
  }
}
module.exports = Activity
