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
    // users (itinerary) {
    //   return itinerary.getUsers()
    // },
    // activities (itinerary) {
    //   return itinerary.getActivities()
    // },
    // food (itinerary) {
    //   return itinerary.getFood()
    // },
    // lodgings (itinerary) {
    //   return itinerary.getLodgings()
    // },
    // flightBookings (itinerary) {
    //   return itinerary.getFlightBookings()
    // },
    // transports (itinerary) {
    //   return itinerary.getTransports()
    // },
    events (itinerary) {
      var ItineraryId = itinerary.id

      var eventsActivity = db.Activity.findAll({where: {ItineraryId: ItineraryId}})
        .then(activities => {
          var arrActivity = []

          activities.forEach(e => {
            arrActivity.push({day: e.startDay, type: 'Activity', modelId: e.id, loadSequence: e.loadSequence, Activity: e})
          })

          return arrActivity
        })

      var eventsFood = db.Food.findAll({where: {ItineraryId: ItineraryId}})
        .then(food => {
          var arrFood = []
          food.forEach(e => {
            arrFood.push({day: e.startDay, type: 'Food', modelId: e.id, loadSequence: e.loadSequence, Food: e})
          })
          return arrFood
        })

      var eventsFlight = db.FlightBooking.findAll({where: {ItineraryId: ItineraryId}})
      .then(bookings => {
        var arrBookingPromises = []

        bookings.forEach(booking => {
          var eventRowsForThisBooking = booking.getFlightInstances()
            .then(instances => {
              var eventRows = []

              instances.forEach(instance => {
                var eventRow = {}
                // row data is divided into instance and booking
                eventRow.instance = instance
                eventRow.booking = booking
                // console.log('instance row with booking', eventRow)
                eventRows.push(eventRow)
              })
              // console.log('eventRows', eventRows)
              return eventRows
            })

          arrBookingPromises.push(eventRowsForThisBooking)
        })

        var arrFlight = []
        return Promise.all(arrBookingPromises)
          .then(values => {
            var flattened = values.reduce(function (a, b) {
              return a.concat(b)
            })
            // console.log('flattened promises', flattened)
            return flattened
          })
          .then(flattened => {
            // console.log('flattened', flattened)
            // modelId refers to flightBooking id
            flattened.forEach(eventRow => {
              arrFlight.push({day: eventRow.instance.startDay, type: 'Flight', start: true, modelId: eventRow.instance.FlightBookingId, loadSequence: eventRow.instance.startLoadSequence, Flight: {FlightInstance: eventRow.instance, FlightBooking: eventRow.booking}})
              arrFlight.push({day: eventRow.instance.endDay, type: 'Flight', start: false, modelId: eventRow.instance.FlightBookingId, loadSequence: eventRow.instance.endLoadSequence, Flight: {FlightInstance: eventRow.instance, FlightBooking: eventRow.booking}})
            })
            return arrFlight
          })
      })

      var eventsTransport = db.Transport.findAll({where: {ItineraryId: ItineraryId}})
        .then(transport => {
          var arrTransport = []
          transport.forEach(e => {
            arrTransport.push({day: e.startDay, type: 'Transport', start: true, modelId: e.id, loadSequence: e.startLoadSequence, Transport: e})
            arrTransport.push({day: e.endDay, type: 'Transport', start: false, modelId: e.id, loadSequence: e.endLoadSequence, Transport: e})
          })
          return arrTransport
        })

      var eventsLodging = db.Lodging.findAll({where: {ItineraryId: ItineraryId}})
        .then(lodging => {
          var arrLodging = []
          lodging.forEach(e => {
            arrLodging.push({day: e.startDay, type: 'Lodging', start: true, modelId: e.id, loadSequence: e.startLoadSequence, Lodging: e})
            arrLodging.push({day: e.endDay, type: 'Lodging', start: false, modelId: e.id, loadSequence: e.endLoadSequence, Lodging: e})
          })
          return arrLodging
        })

      return Promise.all([eventsActivity, eventsFood, eventsFlight, eventsTransport, eventsLodging])
        .then(values => {
          // console.log('all returning event models', values)
          var events = values.reduce(function (a, b) {
            return a.concat(b)
          })

          var sorted = events.sort(function (a, b) {
            return a.day - b.day || a.loadSequence - b.loadSequence
          })
          // console.log('sorted', sorted)
          return sorted
        })
    }
  },
  Query: {
    allItineraries: () => {
      return db.Itinerary.findAll()
    },
    itinerariesByUser: (__, data, context) => {
      // this returns all itineraries for that user, regardless of owner or collab
      // console.log('context', context)
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
      // console.log('owner', UserId)

      Object.keys(data).forEach(key => {
        if (key !== 'UserId' && key !== 'CountryId') {
          newItinerary[key] = data[key]
        }
      })

      if (data.CountryId) {
        newItinerary.CountryId = data.CountryId

        return db.Itinerary.create(newItinerary)
          .then(createdItinerary => {
            db.CountriesItineraries.create({
              ItineraryId: createdItinerary.id,
              CountryId: data.CountryId
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
          db.FlightBooking.destroy({where: {ItineraryId: id}})
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
