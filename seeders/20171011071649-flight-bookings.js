'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        ItineraryId: i,
        paxAdults: 2,
        paxChildren: 2,
        paxInfants: 0,
        cost: (Math.floor(Math.random() * 20) + 1) * 100,
        currency: casual.currency_code,
        classCode: 'Economy',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: faker.internet.url(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('FlightBookings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('FlightBookings', null, {})
  }
}
