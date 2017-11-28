const db = require('../connectors')
const findOrCreateLocation = require('./findOrCreateLocation')

const Flight = {
  Flight: {
    departureLocation (flight) {
      return flight.getFlightDeparture()
    },
    arrivalLocation (flight) {
      return flight.getFlightArrival()
    },
    attachments (flight) {
      return flight.getAttachments()
    }
  },
  Query: {
    findFlight: (__, data) => {
      return db.Flight.findById(data.id)
    }
  },
  Mutation: {
    createFlight: (__, data) => {
      var newFlight = {}
      Object.keys(data).forEach(key => {
        if (key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData' && key !== 'DepartureLocationId' && key !== 'ArrivalLocationId') {
          newFlight[key] = data[key]
        }
      })
      var departure = findOrCreateLocation(data.departureGooglePlaceData)
      var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
      return Promise.all([departure, arrival])
        .then(values => {
          console.log(values)
          newFlight.DepartureLocationId = values[0]
          newFlight.ArrivalLocationId = values[1]
          return db.Flight.create(newFlight)
        })
    },
    updateFlight: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData' && key !== 'DepartureLocationId' && key !== 'ArrivalLocationId') {
          updates[key] = data[key]
        }
      })
      if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
        var departure = findOrCreateLocation(data.departureGooglePlaceData)
        var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        return Promise.all([departure, arrival])
          .then(values => {
            console.log(values)
            updates.DepartureLocationId = values[0]
            updates.ArrivalLocationId = values[1]
            return db.Flight.findById(data.id)
              .then(foundFlight => {
                return foundFlight.update(updates)
              })
          })
      } else {
        return db.Flight.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
      }
    },
    deleteFlight: (__, data) => {
      return db.Flight.destroy({where: {id: data.id}, individualHooks: true})
    }
  }
}
module.exports = Flight
