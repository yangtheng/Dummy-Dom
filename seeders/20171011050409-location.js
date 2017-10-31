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
          openingHour: casual.time(),
          closingHour: casual.time(),
          address: casual.address,
          name: `Location ${idCounter}`,
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
