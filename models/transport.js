'use strict'
module.exports = function (sequelize, DataTypes) {
  var Transport = sequelize.define('Transport', {
    DepartureLocationId: DataTypes.INTEGER,
    ArrivalLocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    departureTime: DataTypes.TIME,
    arrivalTime: DataTypes.TIME,
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    attachment: DataTypes.STRING,
    type: DataTypes.STRING
  })

  Transport.associate = function (models) {
    Transport.belongsTo(models.Itinerary)
    Transport.belongsTo(models.Location)
  }

  return Transport
}
