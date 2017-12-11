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
const Transport = require('./Transport')
const Input = require('./Input')
const Attachment = require('./Attachment')
const Event = require('./Event')

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, Country, User, Itinerary, Location, Activity, FlightBooking, FlightInstance, FlightEvent, Food, Transport, Lodging, Input, Attachment, Event],
  resolvers: mergedResolvers
})
