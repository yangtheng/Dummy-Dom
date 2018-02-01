const db = require('../connectors')
const findOrCreateAirportLocation = require('./helpers/findOrCreateAirportLocation')
const createAllAttachments = require('./helpers/createAllAttachments')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const FlightBooking = {
  FlightBooking: {
    flightInstances (flightBooking) {
      return flightBooking.getFlightInstances()
    }
  },
  Query: {
    findFlightBooking: (__, data) => {
      return db.FlightBooking.findById(data.id)
    }
  },
  Mutation: {
    createFlightBooking: (__, data) => {
      console.log('CREATEFLIGHTBOOKING', data)
      var newFlightBooking = {}
      Object.keys(data).forEach(key => {
        if (key !== 'flightInstances') {
          newFlightBooking[key] = data[key]
        }
      })

      return db.FlightBooking.create(newFlightBooking)
        .then(created => {
          var createdId = created.id
          var promiseArr = []
          data.flightInstances.forEach(instance => {
            var newFlightInstance = {}
            Object.keys(instance).forEach(key => {
              if (key !== 'attachments') {
                newFlightInstance[key] = instance[key]
              }
            })
            newFlightInstance.FlightBookingId = createdId

            var DepartureLocationId = findOrCreateAirportLocation(instance.departureIATA)
            var ArrivalLocationId = findOrCreateAirportLocation(instance.arrivalIATA)

            var flightInstancePromise = Promise.all([DepartureLocationId, ArrivalLocationId])
              .then(values => {
                newFlightInstance.DepartureLocationId = values[0]
                newFlightInstance.ArrivalLocationId = values[1]
                console.log('location ids found')
                return db.FlightInstance.create(newFlightInstance)
              })
              .then(createdInstance => {
                return createAllAttachments(instance.attachments, 'FlightInstance', createdInstance.id)
              })
            promiseArr.push(flightInstancePromise)
          }) // close forEach loop

          // await for all flight instances to be created before returning entire flight booking
          return Promise.all(promiseArr)
            .then(values => {
              // console.log('promisearr values', values)
              // console.log('createdId', createdId)
              return db.FlightBooking.findById(createdId)
            })
            .catch(err => console.log('ERROR', err))
        })
    },
    updateFlightBooking: (__, data) => {
      console.log('UPDATE FLIGHT BOOKING', data)
      var FlightBookingId = data.id
      var bookingUpdates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'flightInstances' && key !== 'changedFlight') {
          bookingUpdates[key] = data[key]
        }
      })

      var flightBooking = db.FlightBooking.findById(FlightBookingId)

      return flightBooking
      .then(foundBooking => {
        return foundBooking.update(bookingUpdates)
      })
      .then(updatedBooking => {
        if (data.changedFlight) {
          // if changed flight, delete all instances, create new instances with new attachments
          console.log('CHANGED FLIGHT')
          return db.FlightInstance.destroy({where: {FlightBookingId: FlightBookingId}, individualHooks: true})
          .then(() => {
            var instancePromiseArr = []
            data.flightInstances.forEach(instance => {
              var instanceObj = {}
              Object.keys(instance).forEach(key => {
                if (key !== 'attachments') {
                  instanceObj[key] = instance[key]
                }
              })
              var DepartureLocationId = findOrCreateAirportLocation(instance.departureIATA)
              var ArrivalLocationId = findOrCreateAirportLocation(instance.arrivalIATA)

              var instancePromise = Promise.all([DepartureLocationId, ArrivalLocationId])
              .then(values => {
                instanceObj.DepartureLocationId = values[0]
                instanceObj.ArrivalLocationId = values[1]
                return db.FlightInstance.create(instanceObj)
              })
              .then(createdInstance => {
                return createAllAttachments(instance.attachments, 'FlightInstance', createdInstance.id)
              })
              instancePromiseArr.push(instancePromise)
            })
            return Promise.all(instancePromiseArr)
            .then(values => {
              // console.log('instancePromiseArr', values)
              return updatedBooking.id
            })
            .catch(err => console.log('ERROR', err))
          })
        } else {
          // if not changed flight, update all instances and attachments
          console.log('NOT CHANGED FLIGHT')
          var instancePromiseArr = []
          data.flightInstances.forEach(instance => {
            var FlightInstanceId = instance.id
            var temp = {}
            Object.keys(instance).forEach(key => {
              if (key !== 'id' && key !== 'addAttachments' && key !== 'removeAttachments') {
                temp[key] = instance[key]
              }
            })
            // resolve location ids from iata (optional)
            if (instance.departureIATA || instance.arrivalIATA) {
              if (instance.departureIATA) {
                var DepartureLocationId = findOrCreateAirportLocation(instance.departureIATA)
              }
              if (instance.arrivalIATA) {
                var ArrivalLocationId = findOrCreateAirportLocation(instance.arrivalIATA)
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
            var instancePromise = instanceUpdates
            .then(constructed => {
              // console.log('constructed instance updates obj', constructed)
              return db.FlightInstance.findById(FlightInstanceId)
              .then(foundInstance => {
                // console.log('foundInstance', foundInstance)
                return foundInstance.update(constructed)
              })
              .then(updatedInstance => {
                // console.log('updatedInstance', updatedInstance)
                var attachmentsPromiseArr = []
                if (instance.addAttachments) {
                  instance.addAttachments.forEach(attachment => {
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
                if (instance.removeAttachments) {
                  instance.removeAttachments.forEach(id => {
                    var attachmentPromise = db.Attachment.destroy({where: {id: id}})
                    attachmentsPromiseArr.push(attachmentPromise)
                  })
                }
                return Promise.all(attachmentsPromiseArr)
                  .then(() => true)
                  .catch(err => console.log(err))
              })
            })
            .catch(err => console.log('ERROR UPDATE INSTANCE', err))
            instancePromiseArr.push(instancePromise)
          })
          return Promise.all(instancePromiseArr)
          .then(values => {
            console.log('instancePromiseArr', values)
            return updatedBooking.id
          })
        }
      })
      .then(bookingId => {
        console.log('BOOKINGID', bookingId)
        return db.FlightBooking.findById(bookingId)
      })
    },
    deleteFlightBooking: (__, data) => {
      // DELETE ALL ATTACHMENTS IN FLIGHT INSTANCES FROM CLOUD
      var deleteAttachmentsPromiseArr = []
      db.FlightBooking.findById(data.id)
      .then(booking => {
        booking.getFlightInstances()
        .then(instance => {
          var deletePromise = deleteAttachmentsFromCloud('FlightInstance', instance.id)
          deleteAttachmentsPromiseArr.push(deletePromise)
        })
      })
      return Promise.all(deleteAttachmentsPromiseArr)
      .then(() => {
        return db.FlightBooking.destroy({where: {id: data.id}, individualHooks: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
module.exports = FlightBooking
