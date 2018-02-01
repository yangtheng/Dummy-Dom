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
        locationAlias: 'Seeded Activity Alias',
        loadSequence: 3,
        startDay: 2,
        endDay: 2,
        description: `Seeded Activity ${i}`,
        notes: casual.sentences(3),
        startTime: 50400, // 2pm 1970
        endTime: 57600, // 4pm
        utcOffset: 480,
        cost: Math.floor(Math.random() * 100) + 1,
        currency: casual.currency_code,
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
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
