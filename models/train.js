'use strict'
module.exports = function (sequelize, DataTypes) {
  var Train = sequelize.define('Train', {
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

  Train.associate = function (models) {
    Train.belongsTo(models.Itinerary)
    Train.belongsTo(models.Location, {
      as: 'TrainArrival',
      foreignKey: 'ArrivalLocationId'
    })
    Train.belongsTo(models.Location, {
      as: 'TrainDeparture',
      foreignKey: 'DepartureLocationId'
    })
    Train.hasMany(models.Attachment)
  }

  Train.beforeDestroy((instance, options) => {
    return sequelize.models.Attachment.destroy({where: {TrainId: instance.id}})
  })

  return Train
}
