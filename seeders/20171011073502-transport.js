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
        startLoadSequence: 3,
        endLoadSequence: 4,
        // date: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        day: 1,
        date: 1508025600, //15th oct
        departureTime: 1508058000, // 9am after flight
        arrivalTime: 1508061600, //10am
        // departureTime: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        // arrivalTime: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        name: `Transport ${i}`,
        notes: casual.sentences(3),
        cost: (Math.floor(Math.random() * 20) + 1) * 10,
        currency: casual.currency_code,
        type: 'Bus',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        attachment: faker.internet.avatar(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Transports', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Transports', null, {})
  }
}
