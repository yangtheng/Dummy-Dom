const db = require('../connectors')

const Lodging = {
  Lodging: {
    itinerary (lodging) {
      return lodging.getItinerary()
    },
    location (lodging) {
      return lodging.getLocation()
    }
  },
  Query: {
    findLodging: (__, data) => {
      return db.Lodging.findById(data.id)
    }
  },
  Mutation: {
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
        .then(status => {
          return status
        })
    }
  }
}

module.exports = Lodging
