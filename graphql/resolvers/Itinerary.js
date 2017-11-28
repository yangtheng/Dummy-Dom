const db = require('../connectors')

const Itinerary = {
  Itinerary: {
    countries (itinerary) {
      return itinerary.getCountries()
    },
    owner (itinerary) {
      var ownerId = null
      return db.UsersItineraries.find({where: {
        ItineraryId: itinerary.id,
        permissions: 'owner'
      }})
        .then(found => {
          ownerId = found.UserId
          return db.User.findById(ownerId)
        })
    },
    users (itinerary) {
      return itinerary.getUsers()
    },
    activities (itinerary) {
      return itinerary.getActivities()
    },
    food (itinerary) {
      return itinerary.getFood()
    },
    lodgings (itinerary) {
      return itinerary.getLodgings()
    },
    flights (itinerary) {
      return itinerary.getFlights()
    },
    transports (itinerary) {
      return itinerary.getTransports()
    },
    events (itinerary) {
      var ItineraryId = itinerary.id

      var eventsActivity = db.Activity.findAll({where: {ItineraryId: ItineraryId}})
        .then(activities => {
          var arrActivity = []
          activities.forEach(e => {
            arrActivity.push({day: e.startDay, type: 'Activity', id: e.id, loadSequence: e.loadSequence, data: e})
          })
          return arrActivity
        })
      var eventsFood = db.Food.findAll({where: {ItineraryId: ItineraryId}})
        .then(food => {
          var arrFood = []
          food.forEach(e => {
            arrFood.push({day: e.startDay, type: 'Food', id: e.id, loadSequence: e.loadSequence, data: e})
          })
          return arrFood
        })
      var eventsFlight = db.Flight.findAll({where: {ItineraryId: ItineraryId}})
        .then(flight => {
          var arrFlight = []
          flight.forEach(e => {
            arrFlight.push({day: e.departureDay, type: 'Flight', start: true, id: e.id, loadSequence: e.departureLoadSequence, data: e})
            arrFlight.push({day: e.arrivalDay, type: 'Flight', start: false, id: e.id, loadSequence: e.arrivalLoadSequence, data: e})
          })
          return arrFlight
        })
      var eventsTransport = db.Transport.findAll({where: {ItineraryId: ItineraryId}})
        .then(transport => {
          var arrTransport = []
          transport.forEach(e => {
            arrTransport.push({day: e.departureDay, type: 'Transport', start: true, id: e.id, loadSequence: e.departureLoadSequence, data: e})
            arrTransport.push({day: e.arrivalDay, type: 'Transport', start: false, id: e.id, loadSequence: e.arrivalLoadSequence, data: e})
          })
          return arrTransport
        })
      var eventsLodging = db.Lodging.findAll({where: {ItineraryId: ItineraryId}})
        .then(lodging => {
          var arrLodging = []
          lodging.forEach(e => {
            arrLodging.push({day: e.startDay, type: 'Lodging', start: true, id: e.id, loadSequence: e.startLoadSequence, data: e})
            arrLodging.push({day: e.endDay, type: 'Lodging', start: false, id: e.id, loadSequence: e.endLoadSequence, data: e})
          })
          return arrLodging
        })

      return Promise.all([eventsActivity, eventsFood, eventsFlight, eventsTransport, eventsLodging])
          .then(values => {
            var events = values.reduce(function (a, b) {
              return a.concat(b)
            })
            var stringified = JSON.stringify(events)
            return stringified
          })
    }
  },
  Query: {
    allItineraries: () => {
      return db.Itinerary.findAll()
    },
    itinerariesByUser: (__, data, context) => {
      // this returns all itineraries for that user, regardless of owner or collab
      console.log('context', context)
      return db.User.findById(context.user)
        .then(user => {
          if (user) {
            return user.getItineraries()
          } else {
            return []
          }
        })
    },
    findItinerary: (__, data, context) => {
      return db.Itinerary.findById(data.id)
        .catch(err => {
          return err
        })
    },
    findCountriesItineraries: (__, data) => {
      return db.CountriesItineraries.find({
        where: {
          CountryId: data.CountryId,
          ItineraryId: data.ItineraryId
        }
      })
    },
    permissions: (__, data) => {
      return db.UsersItineraries.find({
        where: {
          UserId: data.UserId,
          ItineraryId: data.ItineraryId
        }
      })
    }
  },
  Mutation: {
    createItinerary: (__, data) => {
      var newItinerary = {}
      var UserId = data.UserId
      console.log('owner', UserId)

      Object.keys(data).forEach(key => {
        if (key !== 'UserId' && key !== 'countryCode') {
          newItinerary[key] = data[key]
        }
      })

      if (data.countryCode) {
        var CountryId = null
        return db.Country.find({where: {code: data.countryCode}})
          .then(foundCountry => {
            CountryId = foundCountry.id
          })
          .then(() => {
            console.log('country id is', CountryId)
            return db.Itinerary.create(newItinerary)
              .then(createdItinerary => {
                db.CountriesItineraries.create({
                  ItineraryId: createdItinerary.id,
                  CountryId: CountryId
                })
                db.UsersItineraries.create({
                  ItineraryId: createdItinerary.id,
                  UserId: data.UserId,
                  permissions: 'owner'
                })
                return createdItinerary
              })
              .then(createdItinerary => {
                return db.Itinerary.findById(createdItinerary.id)
              })
          })
      } else {
        return db.Itinerary.create(newItinerary)
          .then(createdItinerary => {
            return db.UsersItineraries.create({
              UserId: data.UserId,
              ItineraryId: createdItinerary.id,
              permissions: 'owner'
            })
              .then(() => {
                return db.Itinerary.findById(createdItinerary.id)
              })
          })
      }
    },
    updateItineraryDetails: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id') {
          updates[key] = data[key]
        }
      })
      return db.Itinerary.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
    },
    createCountriesItineraries: (__, data) => {
      return db.Country.find({where: {code: data.countryCode}})
        .then(found => {
          return db.CountriesItineraries.findCreateFind({where: {
            CountryId: found.id,
            ItineraryId: data.ItineraryId
          }})
            .then(results => {
              return results[0]
            })
        })
    },
    deleteCountriesItineraries: (__, data) => {
      return db.CountriesItineraries.destroy({
        where: {
          CountryId: data.CountryId,
          ItineraryId: data.ItineraryId
        }
      })
        .then(status => {
          return status
        })
    },
    deleteItinerary: (__, data) => {
      // need to gate by user permissions in context
      const id = data.id
      return db.UsersItineraries.destroy({where: {ItineraryId: id}})
        .then(() => {
          db.CountriesItineraries.destroy({where: {ItineraryId: id}})
          db.Activity.destroy({where: {ItineraryId: id}})
          db.Food.destroy({where: {ItineraryId: id}})
          db.Lodging.destroy({where: {ItineraryId: id}})
          db.Flight.destroy({where: {ItineraryId: id}})
          db.Transport.destroy({where: {ItineraryId: id}})
        })
        .then(() => {
          return db.Itinerary.destroy({
            where: {id: id}
          })
        })
    }
  }
}
module.exports = Itinerary
