const db = require('../connectors')

const LoadSequence = {
  Mutation: {
    changingLoadSequence: (__, data) => {
      var input = data.input
      input.forEach(e => {
        if (e.event === 'Activity') {
          return db.Activity.findById(e.id)
            .then(found => {
              found.update({
                loadSequence: e.loadSequence,
                startDay: e.day
              })
            })
        } else if (e.event === 'LodgingCheckin') {
          return db.Lodging.findById(e.id)
          .then(found => {
            found.update({
              startLoadSequence: e.loadSequence,
              startDay: e.day
            })
          })
        } else if (e.event === 'LodgingCheckout') {
          return db.Lodging.findById(e.id)
          .then(found => {
            found.update({
              endLoadSequence: e.loadSequence,
              endDay: e.day
            })
          })
        } else if (e.event === 'Food') {
          return db.Food.findById(e.id)
          .then(found => {
            found.update({
              loadSequence: e.loadSequence,
              startDay: e.day
            })
          })
        } else if (e.event === 'Flight') {
          return db.Flight.findById(e.id)
          .then(found => {
            found.update({
              startLoadSequence: e.loadSequence,
              startDay: e.day
            })
          })
        } else if (e.event === 'Transport') {
          return db.Transport.findById(e.id)
          .then(found => {
            found.update({
              startLoadSequence: e.loadSequence,
              startDay: e.day
            })
          })
        } else {
          // if event doesnt match anything
          return false
        }
      })
      return true
    }
  }
}
module.exports = LoadSequence
