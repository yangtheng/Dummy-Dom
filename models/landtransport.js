'use strict'
module.exports = function (sequelize, DataTypes) {
  var LandTransport = sequelize.define('LandTransport', {
    DepartureLocationId: DataTypes.INTEGER,
    ArrivalLocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    departureLocationAlias: DataTypes.STRING,
    arrivalLocationAlias: DataTypes.STRING,
    startLoadSequence: DataTypes.INTEGER,
    endLoadSequence: DataTypes.INTEGER,
    startDay: DataTypes.INTEGER,
    endDay: DataTypes.INTEGER,
    startTime: DataTypes.INTEGER,
    endTime: DataTypes.INTEGER,
    departureNotes: DataTypes.TEXT,
    arrivalNotes: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    backgroundImage: DataTypes.STRING
  })

  LandTransport.associate = function (models) {
    LandTransport.belongsTo(models.Itinerary)
    LandTransport.belongsTo(models.Location, {
      as: 'LandTransportArrival',
      foreignKey: 'ArrivalLocationId'
    })
    LandTransport.belongsTo(models.Location, {
      as: 'LandTransportDeparture',
      foreignKey: 'DepartureLocationId'
    })
    LandTransport.hasMany(models.Attachment)
  }

  LandTransport.beforeDestroy((instance, options) => {
    return sequelize.models.Attachment.destroy({where: {LandTransportId: instance.id}})
  })

  return LandTransport
}
