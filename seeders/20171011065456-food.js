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
        locationAlias: 'Seeded Food Alias',
        loadSequence: 3,
        startDay: 1,
        endDay: 1,
        description: `Seeded Restaurant ${i}`,
        notes: casual.sentences(3),
        startTime: 64800, // 6pm dinner
        endTime: 68400, // 7pm end
        utcOffset: 480,
        cost: Math.floor(Math.random() * 100) + 1,
        currency: casual.currency_code,
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/foodDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Food', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Food', null, {})
  }
}
