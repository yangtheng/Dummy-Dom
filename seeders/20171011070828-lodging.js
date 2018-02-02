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
        locationAlias: 'Seeded Lodging Alias',
        startLoadSequence: 2,
        endLoadSequence: 1,
        description: `Seeded Lodging ${i}`,
        // notes: casual.sentences(3),
        arrivalNotes: casual.sentences(3),
        departureNotes: casual.sentences(3),
        startDay: 2,
        endDay: 6,
        startTime: 36000, // 10am checkin
        endTime: 46800, // 1pm checkout
        cost: Math.floor(Math.random() * 100) + 1,
        currency: casual.currency_code,
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/lodgingDefaultBackground.jpg',
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
