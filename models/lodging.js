'use strict'
module.exports = function (sequelize, DataTypes) {
  var Lodging = sequelize.define('Lodging', {
    LocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    startDate: DataTypes.INTEGER,
    endDate: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    attachment: DataTypes.STRING,
    roomType: DataTypes.STRING
  })

  Lodging.associate = function (models) {
    Lodging.belongsTo(models.Itinerary)
    Lodging.belongsTo(models.Location)
  }

  return Lodging
}
