const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')
const createAllAttachments = require('./helpers/createAllAttachments')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const Train = {
  Train: {
    departureLocation (train) {
      return train.getTrainDeparture()
    },
    arrivalLocation (train) {
      return train.getTrainArrival()
    },
    attachments (train) {
      return train.getAttachments()
    }
  },
  Query: {
    findTrain: (__, data) => {
      return db.Train.findById(data.id)
    }
  },
  Mutation: {
    createTrain: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
          temp[key] = data[key]
        }
      })

      if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
        var departure = findOrCreateLocation(data.departureGooglePlaceData)
        var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        var newTransport = Promise.all([departure, arrival])
          .then(values => {
            temp.DepartureLocationId = values[0]
            temp.ArrivalLocationId = values[1]
            return temp
          })
      } else {
        newTransport = Promise.resolve(temp)
      }

      return newTransport.then(newTransport => {
        return db.Train.create(newTransport)
          .then(created => {
            if (data.attachments) {
              createAllAttachments(data.attachments, 'Train', created.id)
                // check if helper returns true/false
            }
            return created.id
          })
          .then(createdId => {
            return db.Train.findById(createdId)
          })
      })
    },
    updateTrain: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
          updates[key] = data[key]
        }
      })

      // updates only if both departure and arrival are given. what about updating only 1?
      if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
        var departure = findOrCreateLocation(data.departureGooglePlaceData)
        var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        return Promise.all([departure, arrival])
          .then(values => {
            console.log(values)
            updates.DepartureLocationId = values[0]
            updates.ArrivalLocationId = values[1]
            return db.Train.findById(data.id)
              .then(foundTransport => {
                return foundTransport.update(updates)
              })
          })
      } else {
        return db.Train.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
      }
    },
    deleteTrain: (__, data) => {
      var deleteAll = deleteAttachmentsFromCloud('Train', data.id)

      return deleteAll
      .then(isFinished => {
        console.log('isFinished', isFinished)
        return db.Train.destroy({where: {id: data.id}, individualHooks: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}

module.exports = Train
