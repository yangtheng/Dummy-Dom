// importing and merging separate schema files

const { makeExecutableSchema } = require('graphql-tools')

const mergedResolvers = require('../resolvers/mergedResolvers')

const Query = require('./Query')
const Mutation = require('./Mutation')

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`
const Country = require('./Country')
const User = require('./User')
const Itinerary = require('./Itinerary')
const Location = require('./Location')
const Activity = require('./Activity')
const FlightBooking = require('./FlightBooking')
const FlightInstance = require('./FlightInstance')
const FlightEvent = require('./FlightEvent')
const Food = require('./Food')
const Lodging = require('./Lodging')
const LandTransport = require('./LandTransport')
const SeaTransport = require('./SeaTransport')
const Train = require('./Train')
const Input = require('./Input')
const Attachment = require('./Attachment')
const Event = require('./Event')

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, Country, User, Itinerary, Location, Activity, Lodging, FlightBooking, FlightInstance, FlightEvent, Food, LandTransport, SeaTransport, Train, Input, Attachment, Event],
  resolvers: mergedResolvers
})
