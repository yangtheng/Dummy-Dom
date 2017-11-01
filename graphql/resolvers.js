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
    allItineraries: () => {
      return db.Itinerary.findAll()
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
    findTransport: (__, data) => {
      return db.Transport.findById(data.id)
    },
    authorization: (__, data, context) => {
      if (context.user) {
        return {status: true}
      } else {
        return {status: false}
      }
    },
    permissions: (__, data) => {
      return db.UsersItineraries.find({where: {
        UserId: data.UserId,
        ItineraryId: data.ItineraryId
      }})
    },
    findCountriesItineraries: (__, data) => {
      return db.CountriesItineraries.find({where: {
        CountryId: data.CountryId,
        ItineraryId: data.ItineraryId
      }})
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
      return flight.getFlightDeparture()
    },
    arrivalLocation (flight) {
      return flight.getFlightArrival()
    }
  },
  Transport: {
    departureLocation (transport) {
      return transport.getTransportDeparture()
    },
    arrivalLocation (transport) {
      return transport.getTransportArrival()
    }
  },
  Mutation: {
    changingLoadSequence: (__, data) => {
      var input = data.input
      input.forEach(e => {
        if (e.type === 'Activity') {
          return db.Activity.findById(e.id)
            .then(found => {
              found.update({loadSequence: e.loadSequence})
            })
        } else if (e.type === 'Lodging') {
          return db.Lodging.findById(e.id)
          .then(found => {
            found.update({loadSequence: e.loadSequence})
          })
        } else if (e.type === 'Food') {
          return db.Food.findById(e.id)
          .then(found => {
            found.update({loadSequence: e.loadSequence})
          })
        } else if (e.type === 'Flight') {
          return db.Flight.findById(e.id)
          .then(found => {
            found.update({loadSequence: e.loadSequence})
          })
        } else if (e.type === 'Transport') {
          return db.Transport.findById(e.id)
          .then(found => {
            found.update({loadSequence: e.loadSequence})
          })
        } else {
          // if type doesnt match anything
          return false
        }
      })
      return true
    },
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
      var UserId = data.UserId
      var CountryIdArr = data.CountryId
      console.log('owner', UserId)
      console.log('countries', CountryIdArr)
      Object.keys(data).forEach(key => {
        if (key !== 'UserId' && key !== 'CountryId') {
          newItinerary[key] = data[key]
        }
      })
      return db.Itinerary.create(newItinerary)
      .then(created => {
        console.log('created', created)
        db.UsersItineraries.create({
          UserId: UserId,
          ItineraryId: created.id,
          permissions: 'owner'
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
          if (deleteChain) {
            return {status: true}
          } else {
            return {status: false}
          }
        })
    },
    createLocation: (__, data) => {
      console.log('placeId', data.placeId)
      // var newLocation = {}
      // Object.keys(data).forEach(key => {
      //   newLocation[key] = data[key]
      // })
      // return db.Location.findOrCreate({where: newLocation})
      // .spread((row, status) => {
      //   console.log(row.get({
      //     plain: true
      //   }))
      //   console.log(status)
      //   return row
      // })

      // check if location exists first
      return db.Location.find({where: {
        placeId: data.placeId
      }})
        .then(found => {
          console.log('found', found)
          if (found) {
            return found
          } else {
            var newLocation = {}
            Object.keys(data).forEach(key => {
              newLocation[key] = data[key]
            })
            return db.Location.create(newLocation)
          }
        })
    },
    createActivity: (__, data) => {
      console.log('data', data)

      // if we know location has been saved before(bucket), createNewActivity immediately
      // else if found via searching, check if location has been saved before, find LocationId
      // if location has not been saved before, create new location first.

      if (data.LocationId) {
        console.log('locationId was given')
        var newActivity = {}
        Object.keys(data).forEach(key => {
          if (key !== 'googlePlaceData') {
            newActivity[key] = data[key]
          }
        })
        return db.Activity.create(newActivity)
      } else {
        console.log('locationId was not given')
        // extract google places object
        var googlePlaceData = data.googlePlaceData
        var LocationId = null
        // check db if google place id already exists
        return db.Location.find({where: {placeId: googlePlaceData.placeId}})
        .then(found => {
          LocationId = found.id
          console.log('Locationid', LocationId)
        })
        .catch(err => {
          console.log(err)
          console.log('location not found. creating row')
          var countryCode = googlePlaceData.countryCode
          var CountryId = null

          db.Country.find({where: {code: countryCode}})
          .then(found => {
            CountryId = found.id
          })
          .then(() => {
            db.Location.create({
              placeId: googlePlaceData.placeId,
              name: googlePlaceData.name,
              CountryId: CountryId,
              latitude: googlePlaceData.latitude,
              longitude: googlePlaceData.longitude,
              openingHour: googlePlaceData.openingHour,
              closingHour: googlePlaceData.closingHour,
              address: googlePlaceData.address
            })
            .then(created => {
              LocationId = created.id
              console.log('created LocationId', LocationId)
            })
          })
        })
        .then(() => {
          var newActivity = {}
          Object.keys(data).forEach(key => {
            if (key !== 'googlePlaceData') {
              newActivity[key] = data[key]
            }
          })
          newActivity.LocationId = LocationId
          return db.Activity.create(newActivity)
        })
      }
    },
    updateActivity: (__, data) => {
      console.log('data', data)

      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData') {
          updates[key] = data[key]
        }
      })
      console.log('updates', updates)

    if (data.googlePlaceData) {
      var LocationId = null

      return db.Location.find({where: {placeId: data.googlePlaceData.placeId}})
        .then(found => {
          LocationId = found.id
          updates.LocationId = LocationId
          return db.Activity.findById(data.id)
            .then(found => {
              return found.update(updates)
            })
        })
        .catch(() => {
          var CountryId = null
          return db.Country.find({where: {code: data.googlePlaceData.countryCode}})
            .then(found => {
              CountryId = found.id
              return db.Location.create({
                placeId: data.googlePlaceData.placeId,
                name: data.googlePlaceData.name,
                CountryId: CountryId,
                latitude: data.googlePlaceData.latitude,
                longitude: data.googlePlaceData.longitude,
                openingHour: data.googlePlaceData.openingHour,
                closingHour: data.googlePlaceData.closingHour,
                address: data.googlePlaceData.address
              })
                .then(createdLocation => {
                  LocationId = createdLocation.id
                  updates.LocationId = LocationId
                  return db.Activity.findById(data.id)
                    .then(found => {
                      return found.update(updates)
                    })
                })
            })
        })
    } else {
      return db.Activity.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
    }
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
    },
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
        .then(deleted => {
          if (deleted) {
            return {status: true}
          } else {
            return {status: false}
          }
        })
    },
    createLodging: (__, data) => {
      var newLodging = {}
      Object.keys(data).forEach(key => {
        newLodging[key] = data[key]
      })
      return db.Lodging.create(newLodging)
    },
    updateLodging: (__, data) => {
      return db.Lodging.findById(data.id)
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
    deleteLodging: (__, data) => {
      return db.Lodging.destroy({where: {id: data.id}})
        .then(deleted => {
          if (deleted) {
            return {status: true}
          } else {
            return {status: false}
          }
        })
    },
    createFood: (__, data) => {
      var newFood = {}
      Object.keys(data).forEach(key => {
        newFood[key] = data[key]
      })
      return db.Food.create(newFood)
    },
    updateFood: (__, data) => {
      return db.Food.findById(data.id)
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
    deleteFood: (__, data) => {
      return db.Food.destroy({where: {id: data.id}})
        .then(deleted => {
          if (deleted) {
            return {status: true}
          } else {
            return {status: false}
          }
        })
    },
    createTransport: (__, data) => {
      var newTransport = {}
      Object.keys(data).forEach(key => {
        newTransport[key] = data[key]
      })
      return db.Transport.create(newTransport)
    },
    updateTransport: (__, data) => {
      return db.Transport.findById(data.id)
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
    deleteTransport: (__, data) => {
      return db.Transport.destroy({where: {id: data.id}})
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
