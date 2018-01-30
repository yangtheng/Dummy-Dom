'use strict'
const faker = require('faker')
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        ItineraryId: i,
        DepartureLocationId: i,
        ArrivalLocationId: Math.floor(Math.random() * 50) + 1,
        startLoadSequence: 1,
        endLoadSequence: 2,
        startDay: 1,
        endDay: 1,
        startTime: 32400, // 9am after flight
        endTime: 36000, // 10am
        departureUtcOffset: 480,
        arrivalUtcOffset: 480,
        departureNotes: casual.sentences(3),
        arrivalNotes: casual.sentences(3),
        cost: (Math.floor(Math.random() * 20) + 1) * 10,
        currency: casual.currency_code,
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/landTransportDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('LandTransports', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('LandTransports', null, {})
  }
}
