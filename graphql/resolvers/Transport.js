const db = require('../connectors')

const Transport = {
  Transport: {
    departureLocation (transport) {
      return transport.getTransportDeparture()
    },
    arrivalLocation (transport) {
      return transport.getTransportArrival()
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
        .then(status => {
          return status
        })
    }
  }
}

module.exports = Transport
