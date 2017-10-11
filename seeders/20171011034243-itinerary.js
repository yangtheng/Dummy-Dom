'use strict'
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 249; i++) {
      seedArr.push({
        id: i,
        name: `Itinerary ${i}`,
        startDate: faker.date.recent(),
        pax: Math.floor(Math.random() * 4) + 1,
        budget: Math.floor(Math.random() * 6000) + 1000,
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
