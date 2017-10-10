'use strict'
module.exports = function (sequelize, DataTypes) {
  var CountriesItineraries = sequelize.define('CountriesItineraries', {
    CountryId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return CountriesItineraries
}
