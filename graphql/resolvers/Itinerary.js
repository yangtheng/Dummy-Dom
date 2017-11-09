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
      console.log('context.user', context.user)
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
          return db.Itinerary.destroy({
            where: {id: id}
          })
        })
        .then(deleteChain => {
          // if Itinerary.destroy returns true, associated rows must hv also been deleted. deleting itinerary but not assocs will return foreign key constraint
          console.log('chained status', deleteChain)
          return deleteChain
        })
    }
  }
}
module.exports = Itinerary
