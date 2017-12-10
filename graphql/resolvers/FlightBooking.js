const db = require('../connectors')
// const findOrCreateLocation = require('./findOrCreateLocation')
const findOrCreateAirportLocation = require('./findOrCreateAirportLocation')

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
    // create flight and instances at one go
    createFlightBooking: (__, data) => {
      // console.log('data', data)
      // console.log('attachments', data.attachments)
      // console.log('flightInstances', data.flightInstances)

      var newFlightBooking = {}
      Object.keys(data).forEach(key => {
        if (key !== 'attachments' && key !== 'flightInstances') {
          newFlightBooking[key] = data[key]
        }
      })
      return db.FlightBooking.create(newFlightBooking)
        .then(created => {
          data.attachments.forEach(info => {
            return db.Attachment.create({FlightId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
          })
          return created.id // id of create FlightBooking
        })
        .then(createdId => {
          data.flightInstances.forEach(instance => {
            var newFlightInstance = {}
            Object.keys(instance).forEach(key => {
              if (key !== 'departureIATA' && key !== 'arrivalIATA') {
                newFlightInstance[key] = instance.key
              }
            })
            // convert iata to location
            // console.log('departureIATA', instance.departureIATA, 'arrivalIATA', instance.arrivalIATA)

            var DepartureLocationId = findOrCreateAirportLocation(instance.departureIATA)
            var ArrivalLocationId = findOrCreateAirportLocation(instance.arrivalIATA)

            Promise.all([DepartureLocationId, ArrivalLocationId])
              .then(values => {
                console.log('departure/arrival Locationid', values)
              })
            // findOrCreateAirportLocation(instance.departureIATA)
            //   .then(id => {
            //     console.log('DepartureLocationId', id)
            //   })
          })
          // create flightinstances
        })
      // var newFlight = {}
      // Object.keys(data).forEach(key => {
      //   if (key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
      //     newFlight[key] = data[key]
      //   }
      // })
      //
      // if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
      //   var departure = findOrCreateLocation(data.departureGooglePlaceData)
      //   var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
      //   return Promise.all([departure, arrival])
      //   .then(values => {
      //     console.log(values)
      //     newFlight.DepartureLocationId = values[0]
      //     newFlight.ArrivalLocationId = values[1]
      //     return db.Flight.create(newFlight)
      //     .then(created => {
      //       console.log('attachments', data.attachments)
      //       data.attachments.forEach(info => {
      //         return db.Attachment.create({FlightId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
      //       })
      //       return created.id
      //     })
      //     .then((createdId) => {
      //       return db.Flight.findById(createdId)
      //     })
      //   })
      // } else {
      //   return db.Flight.create(newFlight)
      //     .then(created => {
      //       console.log('attachments', data.attachments)
      //       data.attachments.forEach(info => {
      //         return db.Attachment.create({FlightId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
      //       })
      //       return created.id
      //     })
      //     .then((createdId) => {
      //       return db.Flight.findById(createdId)
      //     })
      // }
    },
    // updateFlightBooking: (__, data) => {
    //   var updates = {}
    //   Object.keys(data).forEach(key => {
    //     if (key !== 'id' && key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
    //       updates[key] = data[key]
    //     }
    //   })
    //   if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
    //     var departure = findOrCreateLocation(data.departureGooglePlaceData)
    //     var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
    //     return Promise.all([departure, arrival])
    //       .then(values => {
    //         console.log(values)
    //         updates.DepartureLocationId = values[0]
    //         updates.ArrivalLocationId = values[1]
    //         return db.Flight.findById(data.id)
    //           .then(foundFlight => {
    //             return foundFlight.update(updates)
    //           })
    //       })
    //   } else {
    //     return db.Flight.findById(data.id)
    //     .then(found => {
    //       return found.update(updates)
    //     })
    //   }
    // },
    // delete hooks should delete instances too
    deleteFlightBooking: (__, data) => {
      return db.FlightBooking.destroy({where: {id: data.id}, individualHooks: true})
    }
  }
}
module.exports = FlightBooking
