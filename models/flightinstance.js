'use strict'
module.exports = function (sequelize, DataTypes) {
  var FlightInstance = sequelize.define('FlightInstance', {
    FlightBookingId: DataTypes.INTEGER,
    flightNumber: DataTypes.INTEGER,
    airlineCode: DataTypes.STRING,
    airlineName: DataTypes.STRING,
    departureIATA: DataTypes.STRING,
    arrivalIATA: DataTypes.STRING,
    departureCityCountry: DataTypes.STRING,
    arrivalCityCountry: DataTypes.STRING,
    DepartureLocationId: DataTypes.INTEGER,
    ArrivalLocationId: DataTypes.INTEGER,
    departureTerminal: DataTypes.STRING,
    arrivalTerminal: DataTypes.STRING,
    departureGate: DataTypes.STRING,
    arrivalGate: DataTypes.STRING,
    startDay: DataTypes.INTEGER,
    endDay: DataTypes.INTEGER,
    startTime: DataTypes.INTEGER,
    endTime: DataTypes.INTEGER,
    durationMins: DataTypes.INTEGER,
    startLoadSequence: DataTypes.INTEGER,
    endLoadSequence: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    firstFlight: DataTypes.BOOLEAN
  })

  FlightInstance.associate = function (models) {
    FlightInstance.belongsTo(models.FlightBooking, {onDelete: 'CASCADE', hooks: true})
    FlightInstance.belongsTo(models.Location, {
      as: 'FlightDeparture',
      foreignKey: 'DepartureLocationId'
    })
    FlightInstance.belongsTo(models.Location, {
      as: 'FlightArrival',
      foreignKey: 'ArrivalLocationId'
    })
  }

  return FlightInstance
}
