const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')
const createAllAttachments = require('./helpers/createAllAttachments')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

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
              createAllAttachments(data.attachments, 'Food', created.id)
                // check if helper returns true/false
            }
            return created.id
          })
          .then(createdId => {
            return db.Food.findById(createdId)
          })
      })
    },
    updateFood: (__, data) => {
      console.log('UPDATE FOOD', data)
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData' && key !== 'addAttachments' && key !== 'removeAttachments') {
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

      var attachmentsPromiseArr = []
      if (data.addAttachments) {
        data.addAttachments.forEach(attachment => {
          var addAttachmentPromise = db.Attachment.create({
            FoodId: data.id,
            fileName: attachment.fileName,
            fileAlias: attachment.fileAlias,
            fileSize: attachment.fileSize,
            fileType: attachment.fileType
          })
          attachmentsPromiseArr.push(addAttachmentPromise)
        })
      }
      if (data.removeAttachments) {
        data.removeAttachments.forEach(id => {
          var removeAttachmentPromise = db.Attachment.destroy({where: {
            id: id
          }})
          attachmentsPromiseArr.push(removeAttachmentPromise)
        })
      }
      return Promise.all(attachmentsPromiseArr)
      .then(() => {
        return updateObj.then(updateObj => {
          return db.Food.findById(data.id)
            .then(found => {
              return found.update(updateObj)
            })
        })
      })
    },
    deleteFood: (__, data) => {
      var deleteAll = deleteAttachmentsFromCloud('Food', data.id)

      return deleteAll
      .then(isFinished => {
        console.log('isFinished', isFinished)
        return db.Food.destroy({where: {id: data.id}, individualHooks: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
module.exports = Food
