const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
type User {
  id: Int,
  name: String
}
type Query {
  allUsers: [User!]!
}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
