const db = require('../connectors')

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
        .then(status => {
          return status
        })
    }
  }
}
module.exports = Food
