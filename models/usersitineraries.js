'use strict'
module.exports = function (sequelize, DataTypes) {
  var UsersItineraries = sequelize.define('UsersItineraries', {
    UserId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return UsersItineraries
}
