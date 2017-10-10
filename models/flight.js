'use strict'
module.exports = function (sequelize, DataTypes) {
  var Flight = sequelize.define('Flight', {
    DepartureLocationId: DataTypes.INTEGER,
    ArrivalLocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    terminal: DataTypes.STRING,
    gate: DataTypes.STRING,
    depatureTime: DataTypes.DATE,
    arrivalTime: DataTypes.DATE,
    boardingTime: DataTypes.DATE,
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
