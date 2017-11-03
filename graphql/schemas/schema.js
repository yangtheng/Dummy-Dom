const { makeExecutableSchema } = require('graphql-tools')

const resolvers = require('../resolvers')

const chirpSchema = require('./chirpSchema')
const barkSchema = require('./barkSchema')

const Country = require('./Country')
const User = require('./User')
const Itinerary = require('./Itinerary')
const Location = require('./Location')
const Activity = require('./Activity')
const Flight = require('./Flight')
const Food = require('./Food')
const Lodging = require('./Lodging')
const Transport = require('./Transport')
const randomStuff = require('./randomStuff')

const Query = require('./Query')
const Mutation = require('./Mutation')

const SchemaDefinition = `
    schema {
      query: Query
      mutation: Mutation
    }
  `

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, chirpSchema, barkSchema, Country, User, Itinerary, Location, Activity, Flight, Food, Transport, Lodging, randomStuff],
  resolvers: resolvers
})
