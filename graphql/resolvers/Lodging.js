const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')

const Lodging = {
  Lodging: {
    itinerary (lodging) {
      return lodging.getItinerary()
    },
    location (lodging) {
      return lodging.getLocation()
    },
    attachments (lodging) {
      return lodging.getAttachments()
    }
  },
  Query: {
    findLodging: (__, data) => {
      return db.Lodging.findById(data.id)
    }
  },
  Mutation: {
    createLodging: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'googlePlaceData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        var newLodging = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else if (data.LocationId) {
        temp.LocationId = data.LocationId
        newLodging = Promise.resolve(temp)
      } else if (!data.LocationId && !data.googlePlaceData) {
        newLodging = Promise.resolve(temp)
      }

      return newLodging.then(newLodging => {
        return db.Lodging.create(newLodging)
          .then(created => {
            if (data.attachments) {
              data.attachments.forEach(info => {
                return db.Attachment.create({LodgingId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
              })
            }
            // need promise.all to ensure attachments finish
            return created.id
          })
          .then(createdId => {
            return db.Lodging.findById(createdId)
          })
      })
    },
    updateLodging: (__, data) => {
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
        return db.Lodging.findById(data.id)
          .then(found => {
            return found.update(updateObj)
          })
      })
    },
    deleteLodging: (__, data) => {
      return db.Lodging.destroy({where: {id: data.id}, individualHooks: true})
    }
  }
}

module.exports = Lodging
