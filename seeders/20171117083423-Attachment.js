'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    var eventModels = ['ActivityId', 'FoodId', 'FlightId', 'TransportId', 'LodgingId']
    eventModels.forEach(model => {
      for (var i = 1; i <= 50; i++) {
        seedArr.push({
          [model]: i,
          url: 'http://www.testing.com',
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
