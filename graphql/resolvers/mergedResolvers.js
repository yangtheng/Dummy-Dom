const _ = require('lodash')
// const fs = require('fs')

const User = require('./User')
const Country = require('./Country')
const Location = require('./Location')
const Itinerary = require('./Itinerary')
const Activity = require('./Activity')
const FlightBooking = require('./FlightBooking')
const FlightInstance = require('./FlightInstance')
const Food = require('./Food')
const Lodging = require('./Lodging')
const LandTransport = require('./LandTransport')
const SeaTransport = require('./SeaTransport')
const Train = require('./Train')
const LoadSequence = require('./LoadSequence')
const Attachment = require('./Attachment')

// const resolverFiles = {}
// fs.readdirSync('./graphql/resolvers').forEach(file => {
//   // console.log('file', typeof(file))
//   if (file !== 'helpers' && file !== 'mergedResolvers.js') {
//     // console.log('resolverfile', file)
//     var modelName = file.split('.')[0]
//     // resolverNames.push(name)
//     resolverFiles[modelName] = require('./' + modelName)
//   }
// })
// console.log(resolverFiles)

const resolvers = _.merge(User, Country, Location, Itinerary, Activity, FlightBooking, FlightInstance, Food, Lodging, LandTransport, SeaTransport, Train, LoadSequence, Attachment)

// const resolvers = _.merge(Object.keys(resolverFiles))
module.exports = resolvers
