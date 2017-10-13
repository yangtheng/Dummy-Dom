const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
type Country {
  id: ID!
  name: String!
}
type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  profilePic: String
  country: Country!
  itinerary: [Itinerary]
}
type Itinerary {
  id: ID!
  name: String
  startDate: String
  endDate: String
  pax: Int
  travelInsurance: String
  budget: Int
  country: [Country!]!
}
type Location {
  id: ID!
  CountryId: ID!
  name: String
  latitude: Float
  longitude: Float
  openingHour: String
  closingHour: String
  address: String
  country: Country!
}
type Activity {
  id: ID!
  ItineraryId: ID!
  itinerary: Itinerary!
  name: String
  notes: String
  startTime: String
  endTime: String
  cost: Int
  currency: String
  bookingStatus: Boolean
  bookedThrough: String
  bookingConfirmation: String
  attachment: String
  LocationId: ID!
  location: Location!
}
type DeletedStatus {
  status: Boolean
}
type Query {
  allCountries: [Country!]!
  allUsers: [User!]!
  findUser(id: ID!): User
  findItinerary(id: ID!): Itinerary
  findLocation(id: ID!): Location
  findActivity(id: ID!): Activity
}
type Mutation {
  createUser(name:String!,email:String!,CountryId:Int!,password:String!): User
  updateUser(id:ID!,name:String, email:String, CountryId:Int,password:String, profilePic:String):User
  deleteUser(id:ID!): DeletedStatus
}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
