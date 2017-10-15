const db = require('../graphql/connectors')

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
    }
  },
  User: {
    country (user) {
      return user.getCountry()
    },
    itinerary (user) {
      return user.getItineraries()
    }
  },
  Itinerary: {
    country (itinerary) {
      return itinerary.getCountries()
    },
    user (itinerary) {
      return itinerary.getUsers()
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
  Mutation: {
    createUser: (__, data) => {
      const newUser = {
        name: data.name,
        email: data.email,
        CountryId: data.CountryId,
        password: data.password
      }
      return db.User.create(newUser)
    },
    // createItinerary: (__, data) => {
    //   var newItinerary = {}
    //   Object.keys(data).forEach((key) => {
    //     newItinerary[key] = data[key]
    //   })
    //   console.log('newItinerary', newItinerary)
    //   return db.Itinerary.create(newItinerary)
    //     .then((created) => {
    //       console.log('created Itinerary', created.dataValues)
    //       db.UsersItineraries.create({
    //         UserId: 1,
    //         ItineraryId: created.dataValues.id
    //       })
    //       return created.dataValues
    //     })
    // },
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
        .then((deleted) => {
          console.log('deleted', deleted)
          if (deleted === 0) {
            return {status: false}
          } else if (deleted === 1) {
            return {status: true}
          }
        })
    }
  }
}
