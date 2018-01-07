'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        FlightBookingId: i,
        flightNumber: 1234,
        airlineCode: 'JS',
        airlineName: 'Seeded Airline - Air Koryo',
        DepartureLocationId: i,
        ArrivalLocationId: Math.floor(Math.random() * 50) + 1,
        departureTerminal: `Terminal ${Math.floor(Math.random() * 4) + 1}`,
        arrivalTerminal: `Terminal ${Math.floor(Math.random() * 4) + 1}`,
        departureGate: `Gate ${Math.floor(Math.random() * 10) + 1}`,
        arrivalGate: `Gate ${Math.floor(Math.random() * 10) + 1}`,
        startDay: 1,
        endDay: 2,
        startLoadSequence: 4,
        endLoadSequence: 1,
        startTime:  79200, // 10pm flight overnight
        endTime: 21600, // 6am arrival
        notes: casual.sentences(3),
        firstFlight: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('FlightInstances', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('FlightInstances', null, {})
  }
}
