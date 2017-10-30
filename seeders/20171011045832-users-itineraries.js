'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        UserId: i,
        ItineraryId: i,
        permissions: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        UserId: i + 50,
        ItineraryId: i,
        permissions: 'collab',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('UsersItineraries', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UsersItineraries', null, {})
  }
}
