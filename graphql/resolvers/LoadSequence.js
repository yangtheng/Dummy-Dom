const db = require('../connectors')

const LoadSequence = {
  Mutation: {
    changingLoadSequence: (__, data) => {
      var input = data.input
      input.forEach(e => {
        if (e.type === 'Activity') {
          return db.Activity.findById(e.id)
            .then(found => {
              found.update({
                loadSequence: e.loadSequence,
                startDay: e.day
              })
            })
        } else if (e.type === 'Lodging' && e.start) {
          return db.Lodging.findById(e.id)
          .then(found => {
            found.update({
              startLoadSequence: e.loadSequence,
              startDay: e.day
            })
          })
<<<<<<< HEAD
        } else if (e.type === 'Lodging' && !e.start) {
=======
        } else if (e.type === 'LodgingCheckout') {
>>>>>>> 7a6bf6fba24e6b05c8ef04898d71adc4d83c6e91
          return db.Lodging.findById(e.id)
          .then(found => {
            found.update({
              endLoadSequence: e.loadSequence,
              endDay: e.day
            })
          })
        } else if (e.type === 'Food') {
          return db.Food.findById(e.id)
          .then(found => {
            found.update({
              loadSequence: e.loadSequence,
              startDay: e.day
            })
          })
        } else if (e.type === 'Flight' && e.start) {
          return db.Flight.findById(e.id)
          .then(found => {
            found.update({
              startLoadSequence: e.loadSequence,
              startDay: e.day
            })
          })
        } else if (e.type === 'Flight' && !e.start) {
          return db.Flight.findById(e.id)
          .then(found => {
            found.update({
              endLoadSequence: e.loadSequence,
              endDay: e.day
            })
          })
        } else if (e.type === 'Transport' && e.start) {
          return db.Transport.findById(e.id)
          .then(found => {
            found.update({
              startLoadSequence: e.loadSequence,
              startDay: e.day
            })
          })
<<<<<<< HEAD
        } else if (e.type === 'Transport' && !e.start) {
          return db.Transport.findById(e.id)
          .then(found => {
            found.update({
              endLoadSequence: e.loadSequence,
              endDay: e.day
            })
          })
=======
>>>>>>> 7a6bf6fba24e6b05c8ef04898d71adc4d83c6e91
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
