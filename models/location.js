'use strict'
module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    CountryId: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    openingHour: DataTypes.TIME,
    closingHour: DataTypes.TIME,
    address: DataTypes.STRING,
    name: DataTypes.STRING
  })

  Location.associate = function (models) {
    Location.hasMany(models.Activity)
    Location.hasMany(models.Food)
    Location.hasMany(models.Flight, {
      as: 'FlightArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Location.hasMany(models.Flight, {
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
