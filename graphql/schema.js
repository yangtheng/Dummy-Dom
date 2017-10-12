const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
type Country {
  id: Int!
  name: String!
}
type User {
  id: Int!
  name: String!
  email: String!
  password: String!
  profilePic: String
  country: Country!
}
type Query {
  allCountries: [Country!]!
  allUsers: [User!]!
  findUser(id: ID!): User!
}
type Mutation {
  signUp(name:String!,email:String!,CountryId:Int!,password:String!): User
}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
