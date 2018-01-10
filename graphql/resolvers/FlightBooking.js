const db = require('../connectors')
const findOrCreateAirportLocation = require('./helpers/findOrCreateAirportLocation')
const createAllAttachments = require('./helpers/createAllAttachments')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const FlightBooking = {
  FlightBooking: {
    attachments (flightBooking) {
      return flightBooking.getAttachments()
    },
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
    // CRUD handle both booking and instances tgt
    createFlightBooking: (__, data) => {
      var newFlightBooking = {}
      Object.keys(data).forEach(key => {
        if (key !== 'attachments' && key !== 'flightInstances') {
          newFlightBooking[key] = data[key]
        }
      })

      return db.FlightBooking.create(newFlightBooking)
        .then(created => {
          if (data.attachments) {
            createAllAttachments(data.attachments, 'FlightBooking', created.id)
              // check if helper returns true/false
          }
          return created.id
        })
        .then(createdId => {
          var promiseArr = []
          data.flightInstances.forEach(instance => {
            var newFlightInstance = {}
            Object.keys(instance).forEach(key => {
              if (key !== 'departureIATA' && key !== 'arrivalIATA') {
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
                return db.FlightInstance.create(newFlightInstance)
              })
            // array of promises for each flight instance
            promiseArr.push(flightInstancePromise)
          }) // close forEach loop

          // await for all flight instances to be created before returning entire flight booking
          return Promise.all(promiseArr)
            .then(values => {
              // console.log('promisearr', values)
              return createdId
            })
        }) // close flightinstance creation
        .then(createdId => {
          return db.FlightBooking.findById(createdId)
        })
    },
    updateFlightBooking: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'flightInstances') {
          updates[key] = data[key]
        }
      })
      return db.FlightBooking.findById(data.id)
        .then(found => {
          var arrInstancePromises = []
          data.flightInstances.forEach(instance => {
            var updates = {}
            Object.keys(instance).forEach(key => {
              if (key !== 'id' && key !== 'departureIATA' && key !== 'arrivalIATA') {
                updates[key] = instance[key]
              }
            })
            // ASSUMING UPDATING FLIGHT INSTANCES PASSES IATA TO BACKEND
            var DepartureLocationId = findOrCreateAirportLocation(instance.departureIATA)
            var ArrivalLocationId = findOrCreateAirportLocation(instance.arrivalIATA)

            var instancePromise = Promise.all([DepartureLocationId, ArrivalLocationId])
            .then(values => {
              updates.DepartureLocationId = values[0]
              updates.ArrivalLocationId = values[1]
              return updates
            })
            .then(updates => {
              return db.FlightInstance.findById(instance.id)
                .then(found => {
                  return found.update(updates)
                })
            })
            arrInstancePromises.push(instancePromise)
          }) // close forEach instance

          return Promise.all(arrInstancePromises)
            .then(returning => {
              console.log('returning instance promises', returning)
              return found
            })
        })
        .then(found => {
          return found.update(updates)
        })
    },
    deleteFlightBooking: (__, data) => {
      var deleteAll = deleteAttachmentsFromCloud('FlightBooking', data.id)

      return deleteAll
      .then(isFinished => {
        console.log('isFinished', isFinished)
        return db.FlightBooking.destroy({where: {id: data.id}, individualHooks: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
module.exports = FlightBooking
