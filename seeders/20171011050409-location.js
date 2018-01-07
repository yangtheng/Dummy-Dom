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
          name: `Seeded Location ${idCounter}`,
          openingHours: '[{"close":{"day":1,"time":"0200"},"open":{"day":0,"time":"0500"}},{"close":{"day":2,"time":"0200"},"open":{"day":1,"time":"0500"}},{"close":{"day":3,"time":"0200"},"open":{"day":2,"time":"0500"}},{"close":{"day":4,"time":"0200"},"open":{"day":3,"time":"0500"}},{"close":{"day":5,"time":"0200"},"open":{"day":4,"time":"0500"}},{"close":{"day":6,"time":"0200"},"open":{"day":5,"time":"0500"}},{"close":{"day":0,"time":"0200"},"open":{"day":6,"time":"0500"}}]',
          // openingHoursText: '["Monday: 5:00 am – 2:00 am", "Tuesday: 5:00 am – 2:00 am", "Wednesday: 5:00 am – 2:00 am", "Thursday: 5:00 am – 2:00 am", "Friday: 5:00 am – 2:00 am", "Saturday: 5:00 am – 2:00 am", "Sunday: 5:00 am – 2:00 am"]',
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
