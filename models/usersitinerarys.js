'use strict';
module.exports = function(sequelize, DataTypes) {
  var UsersItinerarys = sequelize.define('UsersItinerarys', {
    UserId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UsersItinerarys;
};