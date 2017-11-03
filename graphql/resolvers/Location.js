const db = require('../connectors')

const Location = {
  Location: {
    country (location) {
      return location.getCountry()
    }
  },
  Query: {
    findLocation: (__, data) => {
      return db.Location.findById(data.id)
    }
  },
  Mutation: {
    createLocation: (__, data) => {
      console.log('placeId', data.placeId)
      var newLocation = {}
      Object.keys(data).forEach(key => {
        newLocation[key] = data[key]
      })
      return db.Location.findCreateFind({where: newLocation})
        .then(results => {
          return results[0]
          // arr of 2 elements. first is found or created row, second is boolean
        })
    }
  }
}
module.exports = Location
