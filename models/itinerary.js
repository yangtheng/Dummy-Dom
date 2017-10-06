'use strict';
module.exports = function(sequelize, DataTypes) {
  var Itinerary = sequelize.define('Itinerary', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    pax: DataTypes.INTEGER,
    travelInsurance: DataTypes.STRING,
    budget: DataTypes.INTEGER
  })

  Itinerary.associate = function (models) {
    Itinerary.hasMany(models.Activity)
    Itinerary.hasMany(models.Food)
    Itinerary.hasMany(models.Flight)
    Itinerary.hasMany(models.Lodging)
    Itinerary.hasMany(models.Transport)
    Itinerary.belongsTo(Many(models.User, {through: 'UsersItineraries'}))
  }
  return Itinerary;
};
