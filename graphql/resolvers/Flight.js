const db = require('../connectors')

const Flight = {
  Flight: {
    departureLocation (flight) {
      return flight.getFlightDeparture()
    },
    arrivalLocation (flight) {
      return flight.getFlightArrival()
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
        newFlight[key] = data[key]
      })
      return db.Flight.create(newFlight)
    },
    updateFlight: (__, data) => {
      return db.Flight.findById(data.id)
        .then(found => {
          var updates = {}
          Object.keys(data).forEach(key => {
            if (key !== 'id') {
              updates[key] = data[key]
            }
          })
          return found.update(updates)
        })
        .catch(err => {
          console.log('err', err)
          return err
        })
    },
    deleteFlight: (__, data) => {
      return db.Flight.destroy({where: {id: data.id}})
        .then(status => {
          return status
        })
    }
  }
}
module.exports = Flight
