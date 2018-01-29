'use strict'
// const casual = require('casual')
// const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        name: `Itinerary ${i}`,
        startDate: 1521072000, // 15th march 2018 thurs
        days: 6,
        description: 'SEEDED ITINERARY DESCRIPTION',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Itineraries', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Itineraries', null, {})
  }
}
