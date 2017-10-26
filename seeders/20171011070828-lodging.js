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
        loadSequence: 1,
        date: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        name: `Lodging ${i}`,
        notes: casual.sentences(3),
        startTime: (new Date(casual.date()).getTime() / 1000).toFixed(0),
        endTime: (new Date(casual.date()).getTime() / 1000).toFixed(0),
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
