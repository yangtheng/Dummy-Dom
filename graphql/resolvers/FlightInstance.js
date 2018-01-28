const db = require('../connectors')
const findOrCreateAirportLocation = require('./helpers/findOrCreateAirportLocation')

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
          return foundInstance.update(instanceUpdates)
        })
      })
      .then(updatedInstance => {
        // add or remove attachments
        var attachmentsPromiseArr = []
        if (data.addAttachments.length) {
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
        if (data.removeAttachments.length) {
          data.removeAttachments.forEach(id => {
            var attachmentPromise = db.Attachment.destroy({where: {id: id}})
            attachmentsPromiseArr.push(attachmentPromise)
          })
        }

        return Promise.all(attachmentsPromiseArr)
          .then(() => {
            return true
          })
          .catch(err => console.log(err))
      })
      .then(() => {
        return db.FlightInstance.findById(FlightInstanceId)
      })

      // if (data.departureIATA && !data.arrivalIATA) {
      //   var updatesObj = findOrCreateAirportLocation(data.departureIATA)
      //     .then(id => {
      //       temp.DepartureLocationId = id
      //       return temp
      //     })
      // } else if (!data.departureIATA && data.arrivalIATA) {
      //   updatesObj = findOrCreateAirportLocation(data.arrivalIATA)
      //     .then(id => {
      //       temp.ArrivalLocationId = id
      //       return temp
      //     })
      // } else if (data.departureIATA && data.arrivalIATA) {
      //   var departure = findOrCreateAirportLocation(data.departureIATA)
      //   var arrival = findOrCreateAirportLocation(data.arrivalIATA)
      //   updatesObj = Promise.all([departure, arrival])
      //   .then(values => {
      //     temp.DepartureLocationId = values[0]
      //     temp.ArrivalLocationId = values[1]
      //     return temp
      //   })
      // } else {
      //   updatesObj = Promise.resolve(temp)
      // }

      // return updatesObj.then(updatesObj => {
      //   console.log('UPDATES OBJ AFTER ADDING AIRPORT LOCATION ID', updatesObj)
      //   var instance = db.FlightInstance.findById(data.id)
      //   return instance.then(foundInstance => {
      //     return foundInstance.update(updatesObj)
      //   })
      // })
    },
    deleteFlightInstance: (__, data) => {
      return db.FlightInstance.destroy({where: {id: data.id}})
    }
  }
}
module.exports = FlightInstance
