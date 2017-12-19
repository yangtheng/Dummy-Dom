'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    // var date = (new Date(casual.date()).getTime() / 1000).toFixed(0)
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        name: `Itinerary ${i}`,
        startDate: 1530025600, // 15th oct 2017
        days: 6,
        pax: Math.floor(Math.random() * 4) + 1,
        budget: (Math.floor(Math.random() * 8) + 2) * 1000,
        travelInsurance: faker.internet.url(),
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
