module.exports = {
  Query: {
    findChirp: () => {
      return {chirp: 'tweet tweet'}
    },
    findBark: () => {
      return {bark: 'bork bork i am doggo'}
    }
  },
  Mutation: {
    testing: (__, data) => {
      return data.testString
    }
  }
}
