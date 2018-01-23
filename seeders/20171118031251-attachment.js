'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    var eventsId = ['ActivityId', 'FoodId', 'FlightBookingId', 'LodgingId', 'LandTransportId']
    // dont seed sea and train yet
    eventsId.forEach(e => {
      // var defaultBackground = {
      //   'ActivityId': 'activityDefaultBackground.jpg',
      //   'FoodId': 'foodDefaultBackground.jpg',
      //   'FlightBookingId': 'flightDefaultBackground.jpg',
      //   'LodgingId': 'lodgingDefaultBackground.jpg',
      //   'LandTransportId': 'landTransportDefaultBackground.jpg'
      // }
      // var eventName = defaultBackground[e]
      for (var i = 1; i <= 50; i++) {
        seedArr.push({
          [e]: i,
          // fileName: eventName,
          fileName: 'ItineraryX_Seeded',
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
