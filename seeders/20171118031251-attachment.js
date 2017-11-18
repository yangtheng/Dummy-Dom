'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    var eventsId = ['ActivityId', 'FoodId', 'FlightId', 'TransportId', 'LodgingId']
    eventsId.forEach(e => {
      for (var i = 1; i <= 50; i++) {
        seedArr.push({
          [e]: i,
          url: 'testingurl.com',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    })
    return queryInterface.bulkInsert('Attachments', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Attachments', null, {})
  }
}
