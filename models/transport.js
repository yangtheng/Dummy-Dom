'use strict'
module.exports = function (sequelize, DataTypes) {
  var Transport = sequelize.define('Transport', {
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
    description: DataTypes.STRING,
    notes: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    backgroundImage: DataTypes.STRING
  })

  Transport.associate = function (models) {
    Transport.belongsTo(models.Itinerary)
    Transport.belongsTo(models.Location, {
      as: 'TransportArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Transport.belongsTo(models.Location, {
      as: 'TransportDeparture',
      foreignKey: 'DepartureLocationId'
    })
    Transport.hasMany(models.Attachment)
  }

  Transport.beforeDestroy((instance, options) => {
    return sequelize.models.Attachment.destroy({where: {TransportId: instance.id}})
  })

  return Transport
}
