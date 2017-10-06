'use strict';
module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define('Food', {
    LocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    attachment: DataTypes.STRING,
    type: DataTypes.STRING
  })

  Food.associate = function (models) {
    Food.belongsTo(models.Itinerary)
    Food.belongsTo(models.Location)
  }

  return Food;
};
