const db = require('../connectors')
const findOrCreateAirportLocation = require('./helpers/findOrCreateAirportLocation')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const FlightInstance = {
  FlightInstance: {
    departureLocation (flightInstance) {
      return flightInstance.getFlightDeparture()
    },
    arrivalLocation (flightInstance) {
      return flightInstance.getFlightArrival()
    },
    attachments (flightInstance) {
      return flightInstance.getAttachments()
    }
  },
  Query: {
    findFlightInstance: (__, data) => {
      return db.FlightInstance.findById(data.id)
    }
  },
  Mutation: {
    updateFlightInstance: (__, data) => {
      console.log('UPDATE DATA', data)
      var FlightInstanceId = data.id
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'addAttachments' && key !== 'removeAttachments') {
          temp[key] = data[key]
        }
      })
      if (data.departureIATA || data.arrivalIATA) {
        if (data.departureIATA) {
          var DepartureLocationId = findOrCreateAirportLocation(data.departureIATA)
        }
        if (data.arrivalIATA) {
          var ArrivalLocationId = findOrCreateAirportLocation(data.arrivalIATA)
        }
        var instanceUpdates = Promise.all([DepartureLocationId, ArrivalLocationId])
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
        instanceUpdates = Promise.resolve(temp)
      }

      return instanceUpdates
      .then(constructed => {
        return db.FlightInstance.findById(FlightInstanceId)
        .then(foundInstance => {
          return foundInstance.update(constructed)
        })
      })
      .then(updatedInstance => {
        console.log('updatedInstance', updatedInstance)
        // add or remove attachments
        var attachmentsPromiseArr = []
        if (data.addAttachments && data.addAttachments.length) {
          data.addAttachments.forEach(attachment => {
            var attachmentPromise = db.Attachment.create({
              FlightInstanceId: FlightInstanceId,
              fileName: attachment.fileName,
              fileAlias: attachment.fileAlias,
              fileType: attachment.fileType,
              fileSize: attachment.fileSize,
              arrivalDeparture: attachment.arrivalDeparture
            })
            attachmentsPromiseArr.push(attachmentPromise)
          })
        }
        if (data.removeAttachments && data.removeAttachments.length) {
          data.removeAttachments.forEach(id => {
            var attachmentPromise = db.Attachment.destroy({where: {id: id}})
            attachmentsPromiseArr.push(attachmentPromise)
          })
        }

        return Promise.all(attachmentsPromiseArr)
          .then(() => true)
          .catch(err => console.log(err))
      })
      .then(() => {
        return db.FlightInstance.findById(FlightInstanceId)
      })
    },
    deleteFlightInstance: (__, data) => {
      var deleteAttachmentsPromiseArr = []
      db.FlightInstance.findById(data.id)
      .then(foundInstance => {
        var deletePromise = deleteAttachmentsFromCloud('FlightInstance', foundInstance.id)
        deleteAttachmentsPromiseArr.push(deletePromise)
      })
      Promise.all(deleteAttachmentsPromiseArr)
      .then(() => {
        return db.FlightInstance.destroy({where: {id: data.id}, individualHooks: true})
      })
    }
  }
}
module.exports = FlightInstance
