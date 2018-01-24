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
    // REWRITE UPDATE FLIGHT INSTANCES FOR ATTACHMENTS
    updateFlightInstance: (__, data) => {
      console.log('UPDATE DATA', data)
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'departureIATA' && key !== 'arrivalIATA') {
          temp[key] = data[key]
        }
      })

      if (data.departureIATA && !data.arrivalIATA) {
        var updatesObj = findOrCreateAirportLocation(data.departureIATA)
          .then(id => {
            temp.DepartureLocationId = id
            return temp
          })
      } else if (!data.departureIATA && data.arrivalIATA) {
        updatesObj = findOrCreateAirportLocation(data.arrivalIATA)
          .then(id => {
            temp.ArrivalLocationId = id
            return temp
          })
      } else if (data.departureIATA && data.arrivalIATA) {
        var departure = findOrCreateAirportLocation(data.departureIATA)
        var arrival = findOrCreateAirportLocation(data.arrivalIATA)
        updatesObj = Promise.all([departure, arrival])
        .then(values => {
          temp.DepartureLocationId = values[0]
          temp.ArrivalLocationId = values[1]
          return temp
        })
      } else {
        updatesObj = Promise.resolve(temp)
      }

      return updatesObj.then(updatesObj => {
        console.log('UPDATES OBJ AFTER ADDING AIRPORT LOCATION ID', updatesObj)
        var instance = db.FlightInstance.findById(data.id)
        return instance.then(foundInstance => {
          return foundInstance.update(updatesObj)
        })
      })
    },
    deleteFlightInstance: (__, data) => {
      return db.FlightInstance.destroy({where: {id: data.id}})
    }
  }
}
module.exports = FlightInstance
