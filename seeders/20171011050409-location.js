'use strict'
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    var idCounter = 1
    for (var i = 1; i <= 50; i++) {
      for (var j = 0; j < 3; j++) {
        seedArr.push({
          CountryId: i,
          placeId: `googleplaceid${idCounter}`,
          latitude: casual.latitude,
          longitude: casual.longitude,
          address: casual.address,
          name: `Location ${idCounter}`,
          // openingHours: ['Monday: 11:00 am – 12:00 am', 'Tuesday: 11:00 am – 12:00 am', 'Wednesday: 11:00 am – 12:00 am', 'Thursday: 11:00 am – 12:00 am', 'Friday: 11:00 am – 2:00 am', 'Saturday: 11:00 am – 2:00 am', 'Sunday: 11:00 am – 12:00 am'],
          openingHours: '[{"close":{"day":0,"time":"2200"},"open":{"day":0,"time":"1200"}},{"close":{"day":1,"time":"2200"},"open":{"day":1,"time":"1200"}},{"close":{"day":2,"time":"2200"},"open":{"day":2,"time":"1200"}},{"close":{"day":3,"time":"2200"},"open":{"day":3,"time":"1200"}},{"close":{"day":4,"time":"2200"},"open":{"day":4,"time":"1200"}},{"close":{"day":5,"time":"2200"},"open":{"day":5,"time":"1200"}},{"close":{"day":6,"time":"2200"},"open":{"day":6,"time":"1200"}}]',
          createdAt: new Date(),
          updatedAt: new Date()
        })
        idCounter++
      }
    }
    return queryInterface.bulkInsert('Locations', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Locations', null, {})
  }
}
