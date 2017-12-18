const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')

const Transport = {
  Transport: {
    departureLocation (transport) {
      return transport.getTransportDeparture()
    },
    arrivalLocation (transport) {
      return transport.getTransportArrival()
    },
    attachments (transport) {
      return transport.getAttachments()
    }
  },
  Query: {
    findTransport: (__, data) => {
      return db.Transport.findById(data.id)
    }
  },
  Mutation: {
    createTransport: (__, data) => {
      var newTransport = {}
      Object.keys(data).forEach(key => {
        if (key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
          newTransport[key] = data[key]
        }
      })
      if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
        var departure = findOrCreateLocation(data.departureGooglePlaceData)
        var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        return Promise.all([departure, arrival])
        .then(values => {
          console.log(values)
          newTransport.DepartureLocationId = values[0]
          newTransport.ArrivalLocationId = values[1]
          return db.Transport.create(newTransport)
          .then(created => {
            console.log('attachments', data.attachments)
            data.attachments.forEach(info => {
              return db.Attachment.create({TransportId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
            })
            return created.id
          })
          .then((createdId) => {
            return db.Transport.findById(createdId)
          })
        })
      } else {
        return db.Transport.create(newTransport)
          .then(created => {
            console.log('attachments', data.attachments)
            data.attachments.forEach(info => {
              return db.Attachment.create({TransportId: created.id, fileName: info.fileName, fileAlias: info.fileAlias, fileType: info.fileType, fileSize: info.fileSize})
            })
            return created.id
          })
          .then((createdId) => {
            return db.Transport.findById(createdId)
          })
      }
    },
    updateTransport: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'departureGooglePlaceData' && key !== 'arrivalGooglePlaceData') {
          updates[key] = data[key]
        }
      })
      if (data.departureGooglePlaceData && data.arrivalGooglePlaceData) {
        var departure = findOrCreateLocation(data.departureGooglePlaceData)
        var arrival = findOrCreateLocation(data.arrivalGooglePlaceData)
        return Promise.all([departure, arrival])
          .then(values => {
            console.log(values)
            updates.DepartureLocationId = values[0]
            updates.ArrivalLocationId = values[1]
            return db.Transport.findById(data.id)
              .then(foundTransport => {
                return foundTransport.update(updates)
              })
          })
      } else {
        return db.Transport.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
      }
    },
    deleteTransport: (__, data) => {
      return db.Transport.destroy({where: {id: data.id}, individualHooks: true})
    }
  }
}

module.exports = Transport
