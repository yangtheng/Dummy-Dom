const db = require('../graphql/connectors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
  Query: {
    allCountries: () => {
      return db.Country.findAll()
    },
    allUsers: () => {
      return db.User.findAll()
    },
    findUser: (__, data) => {
      return db.User.findById(data.id)
    },
    findItinerary: (__, data) => {
      return db.Itinerary.findById(data.id)
    },
    findLocation: (__, data) => {
      return db.Location.findById(data.id)
    },
    findActivity: (__, data) => {
      return db.Activity.findById(data.id)
    },
    findFood: (__, data) => {
      return db.Food.findById(data.id)
    },
    findLodging: (__, data) => {
      return db.Lodging.findById(data.id)
    },
    findFlight: (__, data) => {
      return db.Flight.findById(data.id)
    },
    authorization: (__, data, context) => {
      console.log('context', context)
      if (context.user) {
        return {status: true}
      } else {
        return {status: false}
      }
    }
  },
  User: {
    country (user) {
      return user.getCountry()
    },
    itineraries (user) {
      return user.getItineraries()
    }
  },
  Itinerary: {
    countries (itinerary) {
      return itinerary.getCountries()
    },
    users (itinerary) {
      return itinerary.getUsers()
    },
    activities (itinerary) {
      return itinerary.getActivities()
    }
  },
  Location: {
    country (location) {
      return location.getCountry()
    }
  },
  Activity: {
    itinerary (activity) {
      return activity.getItinerary()
    },
    location (activity) {
      return activity.getLocation()
    }
  },
  Food: {
    itinerary (food) {
      return food.getItinerary()
    },
    location (food) {
      return food.getLocation()
    }
  },
  Lodging: {
    itinerary (lodging) {
      return lodging.getItinerary()
    },
    location (lodging) {
      return lodging.getLocation()
    }
  },
  Flight: {
    departureLocation (flight) {
      return flight.getDepartureLocation()
    },
    arrivalLocation (flight) {
      return flight.getArrivalLocation()
    }
  },
  Mutation: {
    createUser: (__, data) => {
      var hash = bcrypt.hashSync(data.password, 10)
      const newUser = {
        name: data.name,
        email: data.email,
        CountryId: data.CountryId,
        password: hash
      }
      return db.User.create(newUser)
    },
    updateUser: (__, data) => {
      console.log('data is', data)
      return db.User.findById(data.id)
      .then((found) => {
        return found.update({
          name: data.name,
          email: data.email,
          password: data.password
        })
      })
      .then(updated => {
        return updated
      })
    },
    deleteUser: (__, data) => {
      return db.User.destroy({where: {id: data.id}})
      .then(deleted => {
        if (deleted) {
          return {status: true}
        } else {
          return {status: false}
        }
      })
    },
    createToken: (__, data) => {
      return db.User.findOne({
        where: {email: data.email}
      })
      .then(found => {
        return bcrypt.compare(data.password, found.password)
        .then(compared => {
          if (compared) {
            var token = jwt.sign({id: found.id, email: found.email}, process.env.JWT)
            return {
              token: token
            }
          } else {
            return {
              token: 'unauthorized. password incorrect'
            }
          }
        })
      })
      .catch(err => {
        console.log('err', err)
        return err
      })
    },
    createItinerary: (__, data) => {
      var newItinerary = {}
      var UserIdArr = data.UserId
      var CountryIdArr = data.CountryId
      console.log('users', UserIdArr)
      console.log('countries', CountryIdArr)
      Object.keys(data).forEach(key => {
        if (key !== 'UserId' && key !== 'CountryId') {
          newItinerary[key] = data[key]
        }
      })
      return db.Itinerary.create(newItinerary)
      .then(created => {
        console.log('created', created)
        UserIdArr.forEach(id => {
          return db.UsersItineraries.create({
            UserId: id,
            ItineraryId: created.id
          })
        })
        return created
      })
      .then(created => {
        console.log('second then', created)
        CountryIdArr.forEach(id => {
          return db.CountriesItineraries.create({
            CountryId: id,
            ItineraryId: created.id
          })
        })
        return created
      })
      .then(created => {
        console.log('new id is', created.id)
        return db.Itinerary.findById(created.id)
      })
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
      return db.CountriesItineraries.create({
        CountryId: data.CountryId,
        ItineraryId: data.ItineraryId
      })
    },
    deleteCountriesItineraries: (__, data) => {
      return db.CountriesItineraries.destroy({
        where: {
          CountryId: data.CountryId,
          ItineraryId: data.ItineraryId
        }
      })
        .then(deleted => {
          if (deleted) {
            return {status: true}
          } else {
            return {status: false}
          }
        })
    },
    deleteItinerary: (__, data) => {
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
          if (deleteChain) {
            return {status: true}
          } else {
            return {status: false}
          }
        })
    },
    createLocation: (__, data) => {
      var newLocation = {}
      Object.keys(data).forEach(key => {
        newLocation[key] = data[key]
      })
      return db.Location.create(newLocation)
    },
    createActivity: (__, data) => {
      var newActivity = {}
      Object.keys(data).forEach(key => {
        newActivity[key] = data[key]
      })
      return db.Activity.create(newActivity)
    },
    updateActivity: (__, data) => {
      return db.Activity.findById(data.id)
        .then(found => {
          var updates = {}
          Object.keys(data).forEach(key => {
            // prevent id from changing
            // need to prevent deleting of compulsory fields
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
    deleteActivity: (__, data) => {
      return db.Activity.destroy({where: {id: data.id}})
        .then(deleted => {
          if (deleted) {
            return {status: true}
          } else {
            return {status: false}
          }
        })
    }
  }
} // close module exports
