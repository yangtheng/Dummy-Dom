const db = require('../connectors')

const LoadSequence = {
  Mutation: {
    changingLoadSequence: (__, data) => {
      var input = data.input
      // type Activity, Food, Lodging, FlightInstance, LandTransport, SeaTransport,Train
      input.forEach(e => {
        var model = db[e.type].findById(e.id)
        return model.then(found => {
          if (e.type === 'Activity' || e.type === 'Food') {
            return found.update({
              ...{
                loadSequence: e.loadSequence,
                startDay: e.day
              },
              ...e.diff && {
                endDay: e.day + e.diff
              }
            })
          } else if (e.type === 'Lodging' || e.type === 'FlightInstance' || e.type === 'LandTransport' || e.type === 'SeaTransport' || e.type === 'Train') {
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
