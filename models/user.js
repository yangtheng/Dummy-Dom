'use strict'
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    profilePic: DataTypes.STRING,
    password: DataTypes.STRING
  })

  User.associate = function (models) {
    User.belongsTo(models.Country)
    User.belongsToMany(models.Itinerary, {through: 'UsersItineraries'})
  }

  return User
}
