const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')

const FlightInstance = {
  FlightInstance: {
    departureLocation (flightInstance) {
      return flightInstance.getFlightDeparture()
    },
    arrivalLocation (flightInstance) {
      return flightInstance.getFlightArrival()
    }
  }
  // no query for flight instance
  // Query: {
  //   findFlightInstance: (__, data) => {
  //     return db.Flight.findById(data.id)
  //   }
  // },
  // flight instances are created in FlightBooking resolver
  // Mutation: {
  //   createFlightInstance: (__, data) => {
  //     var newFlight = {}
  //     Object.keys(data).forEach(key => {
  //       if (key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
  //         newFlight[key] = data[key]
  //       }
  //     })
  //
  //     if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
  //       var departure = findOrCreateLocation(data.departureGooglePlaceData)
  //       var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
  //       return Promise.all([departure, arrival])
  //       .then(values => {
  //         console.log(values)
  //         newFlight.DepartureLocationId = values[0]
  //         newFlight.ArrivalLocationId = values[1]
  //         return db.Flight.create(newFlight)
  //         .then(created => {
  //           console.log('attachments', data.attachments)
  //           data.attachments.forEach(info => {
  //             return db.Attachment.create({FlightId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
  //           })
  //           return created.id
  //         })
  //         .then((createdId) => {
  //           return db.Flight.findById(createdId)
  //         })
  //       })
  //     } else {
  //       return db.Flight.create(newFlight)
  //         .then(created => {
  //           console.log('attachments', data.attachments)
  //           data.attachments.forEach(info => {
  //             return db.Attachment.create({FlightId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
  //           })
  //           return created.id
  //         })
  //         .then((createdId) => {
  //           return db.Flight.findById(createdId)
  //         })
  //     }
  //   },
  //   updateFlight: (__, data) => {
  //     var updates = {}
  //     Object.keys(data).forEach(key => {
  //       if (key !== 'id' && key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
  //         updates[key] = data[key]
  //       }
  //     })
  //     if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
  //       var departure = findOrCreateLocation(data.departureGooglePlaceData)
  //       var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
  //       return Promise.all([departure, arrival])
  //         .then(values => {
  //           console.log(values)
  //           updates.DepartureLocationId = values[0]
  //           updates.ArrivalLocationId = values[1]
  //           return db.Flight.findById(data.id)
  //             .then(foundFlight => {
  //               return foundFlight.update(updates)
  //             })
  //         })
  //     } else {
  //       return db.Flight.findById(data.id)
  //       .then(found => {
  //         return found.update(updates)
  //       })
  //     }
  //   },
  //   deleteFlight: (__, data) => {
  //     return db.Flight.destroy({where: {id: data.id}, individualHooks: true})
  //   }
  // }
}
module.exports = FlightInstance
