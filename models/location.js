'use strict'
module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    CountryId: DataTypes.INTEGER,
    placeId: DataTypes.STRING,
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    address: DataTypes.STRING,
    openingHours: DataTypes.JSON
  })

  Location.associate = function (models) {
    Location.hasMany(models.Activity)
    Location.hasMany(models.Food)
    Location.hasMany(models.FlightInstance, {
      as: 'FlightArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Location.hasMany(models.FlightInstance, {
      as: 'FlightDeparture',
      foreignKey: 'DepartureLocationId'
    })
    Location.hasMany(models.Lodging)
    Location.hasMany(models.Transport, {
      as: 'TransportArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Location.hasMany(models.Transport, {
      as: 'TransportDeparture',
      foreignKey: 'DepartureLocationId'
    })
    Location.belongsTo(models.Country)
  }

  return Location
}
