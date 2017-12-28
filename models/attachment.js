'use strict'
module.exports = function (sequelize, DataTypes) {
  var Attachment = sequelize.define('Attachment', {
    ActivityId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER,
    LodgingId: DataTypes.INTEGER,
    FlightBookingId: DataTypes.INTEGER,
    LandTransportId: DataTypes.INTEGER,
    SeaTransportId: DataTypes.INTEGER,
    TrainId: DataTypes.INTEGER,
    fileName: DataTypes.STRING,
    fileAlias: DataTypes.STRING,
    fileType: DataTypes.STRING,
    fileSize: DataTypes.STRING
  })

  Attachment.associate = function (models) {
    Attachment.belongsTo(models.Activity, {onDelete: 'CASCADE', hooks: true})
    Attachment.belongsTo(models.Food, {onDelete: 'CASCADE', hooks: true})
    Attachment.belongsTo(models.Lodging, {onDelete: 'CASCADE', hooks: true})
    Attachment.belongsTo(models.FlightBooking, {onDelete: 'CASCADE', hooks: true})
    Attachment.belongsTo(models.LandTransport, {onDelete: 'CASCADE', hooks: true})
    Attachment.belongsTo(models.SeaTransport, {onDelete: 'CASCADE', hooks: true})
    Attachment.belongsTo(models.Train, {onDelete: 'CASCADE', hooks: true})
  }

  return Attachment
}
