const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')
const createAllAttachments = require('./helpers/createAllAttachments')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const LandTransport = {
  LandTransport: {
    departureLocation (landTransport) {
      return landTransport.getLandTransportDeparture()
    },
    arrivalLocation (landTransport) {
      return landTransport.getLandTransportArrival()
    },
    attachments (landTransport) {
      return landTransport.getAttachments()
    }
  },
  Query: {
    findLandTransport: (__, data) => {
      return db.LandTransport.findById(data.id)
    }
  },
  Mutation: {
    createLandTransport: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
          temp[key] = data[key]
        }
      })

      if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
        var departure = findOrCreateLocation(data.departureGooglePlaceData)
        var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        var newTransport = Promise.all([departure, arrival])
          .then(values => {
            temp.DepartureLocationId = values[0]
            temp.ArrivalLocationId = values[1]
            return temp
          })
      } else {
        newTransport = Promise.resolve(temp)
      }

      return newTransport.then(newTransport => {
        return db.LandTransport.create(newTransport)
          .then(created => {
            if (data.attachments) {
              createAllAttachments(data.attachments, 'LandTransport', created.id)
                // check if helper returns true/false
            }
            return created.id
          })
          .then(createdId => {
            return db.LandTransport.findById(createdId)
          })
      })
    },
    updateLandTransport: (__, data) => {
      console.log('UPDATE TRANSPORT', data)

      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData' && key !== 'addAttachments' && key !== 'removeAttachments') {
          temp[key] = data[key]
        }
      })

      // refactoring locations using promise.resolve
      if (data.departureGooglePlaceData || data.arrivalGooglePlaceData) {
        if (data.departureGooglePlaceData) {
          var departure = findOrCreateLocation(data.departureGooglePlaceData)
        }
        if (data.arrivalGooglePlaceData) {
          var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        }
        var tempObj = Promise.all([departure, arrival])
        .then(values => {
          if (values[0]) {
            temp.DepartureLocationId = values[0]
          }
          if (values[1]) {
            temp.ArrivalLocationId = values[1]
          }
          return temp
        })
      } else {
        tempObj = Promise.resolve(temp)
      }

      // after adding possible location, add/remove attachments
      var attachmentsPromiseArr = []
      if (data.addAttachments) {
        data.addAttachments.forEach(attachment => {
          var addAttachmentPromise = db.Attachment.create({
            LandTransportId: data.id,
            fileName: attachment.fileName,
            fileAlias: attachment.fileAlias,
            fileSize: attachment.fileSize,
            fileType: attachment.fileType
          })
          attachmentsPromiseArr.push(addAttachmentPromise)
        })
      }
      if (data.removeAttachments) {
        data.removeAttachments.forEach(id => {
          var removeAttachmentPromise = db.Attachment.destroy({where: {
            id: id
          }})
          attachmentsPromiseArr.push(removeAttachmentPromise)
        })
      }

      // wait for attachment promises to finish before updating LandTransport
      return Promise.all(attachmentsPromiseArr)
      .then(() => {
        return tempObj.then(updates => {
          return db.LandTransport.findById(data.id)
            .then(found => {
              return found.update(updates)
            })
        })
      })
    },
    deleteLandTransport: (__, data) => {
      var deleteAll = deleteAttachmentsFromCloud('LandTransport', data.id)

      return deleteAll
      .then(isFinished => {
        console.log('isFinished', isFinished)
        return db.LandTransport.destroy({where: {id: data.id}, individualHooks: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}

module.exports = LandTransport
