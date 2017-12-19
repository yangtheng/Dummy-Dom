'use strict'
module.exports = function (sequelize, DataTypes) {
  var Itinerary = sequelize.define('Itinerary', {
    name: DataTypes.STRING,
    days: DataTypes.INTEGER,
    startDate: DataTypes.INTEGER,
    pax: DataTypes.INTEGER,
    travelInsurance: DataTypes.STRING,
    budget: DataTypes.INTEGER
  })

  Itinerary.associate = function (models) {
    Itinerary.belongsToMany(models.User, {through: 'UsersItineraries'})
    Itinerary.belongsToMany(models.Country, {through: 'CountriesItineraries'})
    Itinerary.hasMany(models.Activity)
    Itinerary.hasMany(models.Food)
    Itinerary.hasMany(models.Lodging)
    Itinerary.hasMany(models.Transport)
    Itinerary.hasMany(models.FlightBooking)
  }

  Itinerary.beforeDestroy((instance, options) => {
    sequelize.models.UsersItineraries.destroy({where: {ItineraryId: instance.id}})
    sequelize.models.CountriesItineraries.destroy({where: {ItineraryId: instance.id}})
    sequelize.models.Activity.destroy({where: {ItineraryId: instance.id}})
    sequelize.models.Food.destroy({where: {ItineraryId: instance.id}})
    sequelize.models.Lodging.destroy({where: {ItineraryId: instance.id}})
    sequelize.models.Transport.destroy({where: {ItineraryId: instance.id}})
    sequelize.models.FlightBooking.destroy({where: {ItineraryId: instance.id}})
    // FlightBooking has hook to cascade destroy to FlightInstance
    // each model has hook to cascade to Attachments
  })

  return Itinerary
}
