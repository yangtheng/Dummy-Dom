const _ = require('lodash')

const User = require('./User')
const Country = require('./Country')
const Location = require('./Location')
const Itinerary = require('./Itinerary')
const Activity = require('./Activity')
const FlightBooking = require('./FlightBooking')
const FlightInstance = require('./FlightInstance')
const Food = require('./Food')
const Lodging = require('./Lodging')
const Transport = require('./Transport')
const LoadSequence = require('./LoadSequence')
const Attachment = require('./Attachment')

const resolvers = _.merge(User, Country, Location, Itinerary, Activity, FlightBooking, FlightInstance, Food, Lodging, Transport, LoadSequence, Attachment)

module.exports = resolvers
