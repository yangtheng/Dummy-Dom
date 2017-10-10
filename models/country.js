'use strict';
module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    name: DataTypes.STRING
  })

  Country.associate = function (models) {
    Country.hasMany(models.User)
    Country.hasMany(models.Location)
    Country.belongsToMany(models.Itinerary, {through: 'CountriesItineraries'})
  }

  return Country;
};
