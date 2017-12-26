'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    var eventsId = ['ActivityId', 'FoodId', 'FlightBookingId', 'LodgingId', 'LandTransportId']
    // dont seed sea and train yet
    eventsId.forEach(e => {
      for (var i = 1; i <= 50; i++) {
        seedArr.push({
          [e]: i,
          fileName: 'ItineraryX_12121313',
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
