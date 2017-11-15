'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        ItineraryId: i,
        LocationId: i,
        startLoadSequence: 5,
        endLoadSequence: 10,
        name: `Lodging ${i}`,
        notes: casual.sentences(3),
        // startDate: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        // endDate: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        startDay: 1,
        endDay: 6,
        startDate: 1508025600, // 15th oct
        startTime: 1508061600, // 10am checkin
        endDate: 1508457600, // 20th oct
        endTime: 1508061600 + 7200, // 1pm checkout
        cost: Math.floor(Math.random() * 100) + 1,
        currency: casual.currency_code,
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        attachment: faker.internet.avatar(),
        roomType: 'Double',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Lodgings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Lodgings', null, {})
  }
}
