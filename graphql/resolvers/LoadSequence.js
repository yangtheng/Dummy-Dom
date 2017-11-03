const db = require('../connectors')

const LoadSequence = {
  Mutation: {
    changingLoadSequence: (__, data) => {
      var input = data.input
      input.forEach(e => {
        if (e.type === 'Activity') {
          return db.Activity.findById(e.id)
            .then(found => {
              found.update({loadSequence: e.loadSequence, date: e.date})
            })
        } else if (e.type === 'LodgingCheckin') {
          return db.Lodging.findById(e.id)
          .then(found => {
            found.update({startLoadSequence: e.loadSequence, startDate: e.date})
          })
        } else if (e.type === 'Food') {
          return db.Food.findById(e.id)
          .then(found => {
            found.update({loadSequence: e.loadSequence, date: e.date})
          })
        } else if (e.type === 'Flight') {
          return db.Flight.findById(e.id)
          .then(found => {
            found.update({departureLoadSequence: e.loadSequence, departureDate: e.date})
          })
        } else if (e.type === 'Transport') {
          return db.Transport.findById(e.id)
          .then(found => {
            found.update({startLoadSequence: e.loadSequence, date: e.date})
          })
        } else if (e.type === 'LodgingCheckout') {
          return db.Lodging.findById(e.id)
          .then(found => {
            found.update({endLoadSequence: e.loadSequence, endDate: e.date})
          })
        } else {
          // if type doesnt match anything
          return false
        }
      })
      return true
    }
  }
}
module.exports = LoadSequence
