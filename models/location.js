'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    CountryId: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    openingHour: DataTypes.DATE,
    closingHour: DataTypes.DATE,
    address: DataTypes.STRING,
    name: DataTypes.STRING
  })

  Location.associate = function (models) {
    Location.hasMany(models.Activity)
    Location.hasMany(models.Food)
    Location.hasMany(models.Flight)
    Location.hasMany(models.Lodging)
    Location.hasMany(models.Transport)
    Location.belongsTo(models.Country)
  }

  return Location;
};
