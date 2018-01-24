'use strict'
module.exports = function (sequelize, DataTypes) {
  var SeaTransport = sequelize.define('SeaTransport', {
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

  SeaTransport.associate = function (models) {
    SeaTransport.belongsTo(models.Itinerary)
    SeaTransport.belongsTo(models.Location, {
      as: 'SeaTransportArrival',
      foreignKey: 'ArrivalLocationId'
    })
    SeaTransport.belongsTo(models.Location, {
      as: 'SeaTransportDeparture',
      foreignKey: 'DepartureLocationId'
    })
    SeaTransport.hasMany(models.Attachment)
  }

  SeaTransport.beforeDestroy((instance, options) => {
    return sequelize.models.Attachment.destroy({where: {SeaTransportId: instance.id}})
  })

  return SeaTransport
}
