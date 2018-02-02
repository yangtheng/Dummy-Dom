'use strict'
module.exports = function (sequelize, DataTypes) {
  var Lodging = sequelize.define('Lodging', {
    LocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    startLoadSequence: DataTypes.INTEGER,
    endLoadSequence: DataTypes.INTEGER,
    locationAlias: DataTypes.STRING,
    description: DataTypes.STRING,
    // notes: DataTypes.TEXT,
    arrivalNotes: DataTypes.TEXT,
    departureNotes: DataTypes.TEXT,
    startDay: DataTypes.INTEGER,
    endDay: DataTypes.INTEGER,
    startTime: DataTypes.INTEGER,
    endTime: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    backgroundImage: DataTypes.STRING
  })

  Lodging.associate = function (models) {
    Lodging.belongsTo(models.Itinerary)
    Lodging.belongsTo(models.Location)
    Lodging.hasMany(models.Attachment)
  }

  Lodging.beforeDestroy((instance, options) => {
    return sequelize.models.Attachment.destroy({where: {LodgingId: instance.id}})
  })

  return Lodging
}
