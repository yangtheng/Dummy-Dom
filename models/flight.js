'use strict'
module.exports = function (sequelize, DataTypes) {
  var Flight = sequelize.define('Flight', {
    DepartureLocationId: DataTypes.INTEGER,
    ArrivalLocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    arrivalTerminal: DataTypes.STRING,
    arrivalGate: DataTypes.STRING,
    departureTerminal: DataTypes.STRING,
    departureGate: DataTypes.STRING,
    departureLoadSequence: DataTypes.INTEGER,
    arrivalLoadSequence: DataTypes.INTEGER,
    departureDate: DataTypes.INTEGER,
    arrivalDate: DataTypes.INTEGER,
    departureTime: DataTypes.INTEGER,
    arrivalTime: DataTypes.INTEGER,
    boardingTime: DataTypes.INTEGER,
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    attachment: DataTypes.STRING
  })

  Flight.associate = function (models) {
    Flight.belongsTo(models.Itinerary)
    Flight.belongsTo(models.Location)
  }

  return Flight
}
