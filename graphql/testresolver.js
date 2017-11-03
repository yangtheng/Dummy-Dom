const _ = require('lodash')

const chirpResolver = {
  Query: {
    findChirp: () => {
      return {chirp: 'tweet tweet'}
    }
  },
  Chirp: {
    barker (chirp) {
      return {bark: 'woof woof'}
    }
  }
}

const barkResolver = {
  Query: {
    findBark: () => {
      return {bark: 'bork bork i am doggo'}
    }
  }
}

const resolvers = _.merge(chirpResolver, barkResolver)

module.exports = resolvers
