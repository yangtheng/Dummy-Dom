const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
type Country {
  id: ID!
  name: String!
  code: String!
}
type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  profilePic: String
  country: Country!
  itineraries: [Itinerary]
}
type Itinerary {
  id: ID!
  name: String
  startDate: String
  endDate: String
  pax: Int
  travelInsurance: String
  budget: Int
  countries: [Country]
  users: [User]
  activities: [Activity]
}
type Location {
  id: ID!
  CountryId: ID!
  name: String!
  latitude: Float!
  longitude: Float!
  openingHour: String
  closingHour: String
  address: String!
  country: Country!
}
type Activity {
  id: ID!
  ItineraryId: ID!
  itinerary: Itinerary!
  LocationId: ID!
  location: Location!
  loadSequence: Int!
  date: String!
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
}
type DeletedStatus {
  status: Boolean
}
type AuthorizationStatus {
  status: Boolean
}
type Token {
  token: String
}
type Query {
  allCountries: [Country!]!
  allUsers: [User!]!
  findUser(id: ID!): User
  findItinerary(id: ID!): Itinerary
  findLocation(id: ID!): Location
  findActivity(id: ID!): Activity
  authorization: AuthorizationStatus
}
type Mutation {
  createUser(name:String!,email:String!,CountryId:Int!,password:String!): User

  createToken(email:String!, password:String!): Token

  createItinerary(name:String!,startDate:String,endDate:String,pax:Int,travelInsurance:String,budget:Int): Itinerary

  createLocation(CountryId: ID!, name:String!, latitude:String!, longitude:String!,openingHour:String,closingHour:String,address:String!): Location

  createActivity(ItineraryId: ID!, LocationId: ID!, date: String!, loadSequence: Int!, name: String, notes: String, startTime: String, endTime: String, cost: Int, currency: String, bookingStatus: String, bookedThrough: String, bookingConfirmation: String, attachment: String): Activity

  updateUser(id:ID!,name:String, email:String, CountryId:Int,password:String, profilePic:String):User

  deleteUser(id:ID!): DeletedStatus
}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
