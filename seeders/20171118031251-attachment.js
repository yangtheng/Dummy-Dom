'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    var eventsId = ['ActivityId', 'FoodId', 'FlightInstanceId', 'LodgingId', 'LandTransportId']
    // dont seed sea and train yet
    eventsId.forEach(e => {
      if (e === 'ActivityId' || e === 'FoodId') {
        for (var i = 1; i <= 50; i++) {
          seedArr.push({
            [e]: i,
            fileName: 'ItineraryX_Seeded',
            fileAlias: 'Seeded fileAlias',
            fileSize: '2MB',
            fileType: 'jpeg',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      } else if (e === 'FlightInstanceId' || e === 'LandTransportId' || e === 'LodgingId') {
        for (var j = 1; j <= 50; j++) {
          seedArr.push({
            [e]: j,
            arrivalDeparture: 'departure',
            fileName: 'ItineraryX_Seeded',
            fileAlias: 'Seeded fileAlias',
            fileSize: '2MB',
            fileType: 'jpeg',
            createdAt: new Date(),
            updatedAt: new Date()
          })
          seedArr.push({
            [e]: j,
            arrivalDeparture: 'arrival',
            fileName: 'ItineraryX_Seeded',
            fileAlias: 'Seeded fileAlias',
            fileSize: '2MB',
            fileType: 'jpeg',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      }
    })
    return queryInterface.bulkInsert('Attachments', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Attachments', null, {})
  }
}
