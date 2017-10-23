'use strict'
const faker = require('faker')
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        ItineraryId: i,
        LocationId: i,
        loadSequence: 1,
        date: casual.date(),
        name: `Activity ${i}`,
        notes: casual.sentences(3),
        startTime: casual.time(),
        endTime: casual.time(),
        cost: Math.floor(Math.random() * 100) + 1,
        currency: casual.currency_code,
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        attachment: faker.internet.avatar(),
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
