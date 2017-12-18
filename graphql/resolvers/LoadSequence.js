const db = require('../connectors')

const LoadSequence = {
  Mutation: {
    changingLoadSequence: (__, data) => {
      var input = data.input
      // type Activity, Food, Lodging, Transport, FlightInstance
      input.forEach(e => {
        var model = db[e.type].findById(e.id)
        return model.then(found => {
          if (e.type === 'Activity' || e.type === 'Food') {
            return found.update({
              loadSequence: e.loadSequence,
              day: e.day
            })
          } else if (e.type === 'Transport' || e.type === 'Lodging' || e.type === 'FlightInstance') {
            if (e.start) {
              return found.update({
                startLoadSequence: e.loadSequence,
                startDay: e.day
              })
            } else if (!e.start) {
              return found.update({
                endLoadSequence: e.loadSequence,
                endDay: e.day
              })
            }
          } else {
            return false // no model match
          }
        })
      })
      return true
    }
  }
}
module.exports = LoadSequence
