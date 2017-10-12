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
type DeletedStatus {
  status: Boolean
}
type Query {
  allCountries: [Country!]!
  allUsers: [User!]!
  findUser(id: ID!): User!
}
type Mutation {
  createUser(name:String!,email:String!,CountryId:Int!,password:String!): User
  updateUser(id:ID!,name:String, email:String, CountryId:Int,password:String, profilePic:String):User
  deleteUser(id:ID!): DeletedStatus
}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
