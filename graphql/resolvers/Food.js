const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')

const Food = {
  Food: {
    itinerary (food) {
      return food.getItinerary()
    },
    location (food) {
      return food.getLocation()
    },
    attachments (food) {
      return food.getAttachments()
    }
  },
  Query: {
    findFood: (__, data) => {
      return db.Food.findById(data.id)
    }
  },
  Mutation: {
    createFood: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'googlePlaceData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        var newFood = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else if (data.LocationId) {
        temp.LocationId = data.LocationId
        newFood = Promise.resolve(temp)
      } else if (!data.LocationId && !data.googlePlaceData) {
        newFood = Promise.resolve(temp)
      }

      return newFood.then(newFood => {
        return db.Food.create(newFood)
          .then(created => {
            if (data.attachments) {
              data.attachments.forEach(info => {
                return db.Attachment.create({FoodId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
              })
            }
            // need promise.all to ensure attachments finish
            return created.id
          })
          .then(createdId => {
            return db.Food.findById(createdId)
          })
      })
    },
    updateFood: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData') {
          temp[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        var updateObj = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else {
        updateObj = Promise.resolve(temp)
      }

      return updateObj.then(updateObj => {
        return db.Food.findById(data.id)
          .then(found => {
            return found.update(updateObj)
          })
      })
    },
    deleteFood: (__, data) => {
      return db.Food.destroy({where: {id: data.id}, individualHooks: true})
    }
  }
}
module.exports = Food
