'use strict'
const faker = require('faker')
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        id: i,
        ItineraryId: i,
        LocationId: i,
        name: `Activity ${i}`,
        notes: casual.sentences(3),
        startTime: casual.time(),
        endTime: casual.time(),
        cost: Math.floor(Math.random() * 100) + 1,
        currency: casual.currency_code,
        bookingStatus: false,
        attachment: faker.internet.url(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Activities', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Activities', null, {})
  }
}
