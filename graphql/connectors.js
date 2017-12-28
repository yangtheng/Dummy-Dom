const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config)
}

var db = {
  Country: sequelize.import('../models/country'),
  User: sequelize.import('../models/user'),
  Itinerary: sequelize.import('../models/itinerary'),
  UsersItineraries: sequelize.import('../models/usersitineraries'),
  CountriesItineraries: sequelize.import('../models/countriesitineraries'),
  Location: sequelize.import('../models/location'),
  Activity: sequelize.import('../models/activity'),
  Food: sequelize.import('../models/food'),
  Lodging: sequelize.import('../models/lodging'),
  FlightBooking: sequelize.import('../models/flightbooking'),
  FlightInstance: sequelize.import('../models/flightinstance'),
  LandTransport: sequelize.import('../models/landtransport'),
  SeaTransport: sequelize.import('../models/seatransport'),
  Train: sequelize.import('../models/train'),
  Attachment: sequelize.import('../models/attachment')
}

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize has connected to db')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = db
