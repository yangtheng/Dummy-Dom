'use strict'
module.exports = function (sequelize, DataTypes) {
  var Itinerary = sequelize.define('Itinerary', {
    name: DataTypes.STRING,
    startDate: DataTypes.INTEGER,
    endDate: DataTypes.INTEGER,
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
    Itinerary.belongsToMany(models.User, {through: 'UsersItineraries', onDelete: 'cascade', hooks: true})
    Itinerary.belongsToMany(models.Country, {through: 'CountriesItineraries', onDelete: 'cascade', hooks: true})
  }
  return Itinerary
}
