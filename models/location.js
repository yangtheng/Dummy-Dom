'use strict'
module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    CountryId: DataTypes.INTEGER,
    placeId: DataTypes.STRING,
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    utcOffset: DataTypes.INTEGER,
    openingHours: DataTypes.JSON,
    openingHoursText: DataTypes.JSON
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
    Location.hasMany(models.LandTransport, {
      as: 'LandTransportArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Location.hasMany(models.LandTransport, {
      as: 'LandTransportDeparture',
      foreignKey: 'DepartureLocationId'
    })
    Location.hasMany(models.SeaTransport, {
      as: 'SeaTransportArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Location.hasMany(models.SeaTransport, {
      as: 'SeaTransportDeparture',
      foreignKey: 'DepartureLocationId'
    })
    Location.hasMany(models.Train, {
      as: 'TrainArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Location.hasMany(models.Train, {
      as: 'TrainDeparture',
      foreignKey: 'DepartureLocationId'
    })
    Location.belongsTo(models.Country)
  }

  return Location
}
