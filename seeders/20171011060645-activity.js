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
        loadSequence: 6,
        // date: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        day: 1,
        date: 1508025600,
        name: `Activity ${i}`,
        notes: casual.sentences(3),
        // startTime: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        // endTime: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        startTime: 1508076000, // 2pm
        endTime:  1508083200, // 4pm
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
