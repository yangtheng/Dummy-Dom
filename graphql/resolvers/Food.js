const db = require('../connectors')
const findOrCreateLocation = require('./findOrCreateLocation')

const Food = {
  Food: {
    itinerary (food) {
      return food.getItinerary()
    },
    location (food) {
      return food.getLocation()
    }
  },
  Query: {
    findFood: (__, data) => {
      return db.Food.findById(data.id)
    }
  },
  Mutation: {
    createFood: (__, data) => {
      return findOrCreateLocation(data)
        .then(LocationId => {
          console.log('returning LocationId', LocationId)
          var newFood = {}
          Object.keys(data).forEach(key => {
            if (key !== 'googlePlaceData' && key !== 'LocationId') {
              newFood[key] = data[key]
            }
          })
          newFood.LocationId = LocationId
          return db.Food.create(newFood)
        })
    },
    updateFood: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData') {
          updates[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        return findOrCreateLocation(data)
          .then(LocationId => {
            updates.LocationId = LocationId
            return db.Food.findById(data.id)
              .then(foundFood => {
                return foundFood.update(updates)
              })
          })
      } else {
        return db.Food.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
      }
    },
    deleteFood: (__, data) => {
      return db.Food.destroy({where: {id: data.id}})
        .then(status => {
          return status
        })
    }
  }
}
module.exports = Food
