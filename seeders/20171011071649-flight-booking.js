'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      var booking1 = {
        ItineraryId: i,
        paxAdults: 2,
        paxChildren: 2,
        paxInfants: 0,
        cost: (Math.floor(Math.random() * 20) + 1) * 100,
        currency: casual.currency_code,
        classCode: 'Business',
        departureDate: 1521072000, //15th march
        returnDate: 1521504000,
        departureIATA: 'SIN',
        arrivalIATA: 'SEL',
        departureName: 'Changi International Airport',
        arrivalName: 'Seoul, Korea',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/flightDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      seedArr.push(booking1)
    }
    return queryInterface.bulkInsert('FlightBookings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('FlightBookings', null, {})
  }
}
