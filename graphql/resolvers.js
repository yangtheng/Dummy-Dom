const db = require('../graphql/connectors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
  // example get requests
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
  // example post, update, delete requests.
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
      Object.keys(data).forEach(key => {
        newItinerary[key] = data[key]
      })
      var newItineraryId = null
      return db.Itinerary.create(newItinerary)
      .then(created => {
        console.log('created', created.dataValues)
        db.UsersItineraries.create({
          UserId: 1,
          ItineraryId: created.dataValues.id
        })
        return created
      })
      .then(created => {
        console.log('second then', created.dataValues)
        db.CountriesItineraries.create({
          CountryId: 1,
          ItineraryId: created.dataValues.id
        })
        newItineraryId = created.dataValues.id
        return created
      })
      .then(() => {
        console.log('new id is', newItineraryId)
        return db.Itinerary.findById(newItineraryId)
      })
    },
    deleteItinerary: (__, data) => {
      const id = data.id
      return db.Itinerary.destroy({where: {id: id}})
        .then(() => {
          return db.CountriesItineraries.destroy({where: {ItineraryId: id}})
        })
        .then(() => {
          return db.UsersItineraries.destroy({where: {ItineraryId: id}})
        })
        .then(deleteChain => {
          console.log('chained status', deleteChain)
          if (deleteChain) {
            return {status: true}
          } else {
            return {status: false}
          }
        })
    },
    createLocation: (__, data) => {
      console.log('data is', data)
      var newLocation = {}
      Object.keys(data).forEach(key => {
        newLocation[key] = data[key]
      })
      console.log('newLocation', newLocation)
      return db.Location.create(newLocation)
    },
    createActivity: (__, data) => {
      var newActivity = {}
      Object.keys(data).forEach(key => {
        newActivity[key] = data[key]
      })
      console.log('newActivity', newActivity)
      return db.Activity.create(newActivity)
    },
    updateActivity: (__, data) => {
      console.log('data is', data)
      return db.Activity.findById(data.id)
        .then(found => {
          console.log('found activity', found)
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
