const db = require('../connectors')
const findOrCreateLocation = require('./findOrCreateLocation')

const Lodging = {
  Lodging: {
    itinerary (lodging) {
      return lodging.getItinerary()
    },
    location (lodging) {
      return lodging.getLocation()
    },
    attachments (lodging) {
      return lodging.getAttachments()
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
        if (key !== 'googlePlaceData' && key !== 'LocationId') {
          newLodging[key] = data[key]
        }
      })
      if (data.googlePlaceData) {
        return findOrCreateLocation(data.googlePlaceData)
          .then(id => {
            newLodging.LocationId = id
            return db.Lodging.create(newLodging)
          })
      } else if (data.LocationId) {
        newLodging.LocationId = data.LocationId
        return db.Lodging.create(newLodging)
      }
    },
    updateLodging: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData') {
          updates[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        return findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            updates.LocationId = LocationId
            return db.Lodging.findById(data.id)
              .then(foundLodging => {
                return foundLodging.update(updates)
              })
          })
      } else {
        return db.Lodging.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
      }
    },
    deleteLodging: (__, data) => {
      return db.Lodging.destroy({where: {id: data.id}, individualHooks: true})
    }
  }
}

module.exports = Lodging
