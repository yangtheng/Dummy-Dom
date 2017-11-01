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
  name: String!
  startDate: Int
  endDate: Int
  pax: Int
  travelInsurance: String
  budget: Int
  countries: [Country]
  owner: User
  users: [User!]
  activities: [Activity]
  food: [Food]
  lodgings: [Lodging]
  flights: [Flight]
  transports: [Transport]
}
type CountriesItineraries {
  CountryId: ID!
  ItineraryId: ID!
}
type UsersItineraries {
  UserId: ID!
  ItineraryId: ID!
  permissions: String!
}
type Location {
  id: ID!
  placeId: String!
  CountryId: ID
  name: String
  latitude: Float
  longitude: Float
  openingHour: String
  closingHour: String
  address: String
  country: Country
}
type Activity {
  id: ID!
  ItineraryId: ID!
  itinerary: Itinerary!
  LocationId: ID!
  location: Location!
  loadSequence: Int
  date: Int
  name: String
  notes: String
  startTime: Int
  endTime: Int
  cost: Int
  currency: String
  bookingStatus: Boolean
  bookedThrough: String
  bookingConfirmation: String
  attachment: String
}
type Food {
  id: ID!
  LocationId: ID!
  location: Location!
  ItineraryId: ID!
  itinerary: Itinerary!
  loadSequence: Int!
  date: Int
  name: String
  notes: String
  startTime: Int
  endTime: Int
  cost: Int
  currency: String
  bookingStatus: Boolean
  bookedThrough: String
  bookingConfirmation: String
  attachment: String
  type: String
}
type Lodging {
  id: ID!
  LocationId: ID!
  location: Location!
  ItineraryId: ID!
  itinerary: Itinerary
  startLoadSequence: Int!
  endLoadSequence: Int!
  name: String
  notes: String
  startDate: Int
  startTime: Int
  endDate: Int
  endTime: Int
  cost: Int
  currency: String
  bookingStatus: Boolean
  bookedThrough: String
  bookingConfirmation: String
  attachment: String
  roomType: String
}
type Flight {
  id: ID!
  DepartureLocationId: ID!
  departureLocation: Location!
  ArrivalLocationId: ID!
  arrivalLocation: Location!
  ItineraryId: ID!
  departureTerminal: String
  departureGate: String
  arrivalTerminal: String
  arrivalGate: String
  departureLoadSequence: Int
  arrivalLoadSequence: Int
  departureDate: Int
  arrivalDate: Int
  departureTime: Int
  boardingTime: Int
  arrivalTime: Int
  name: String
  notes: String
  cost: Int
  currency: String
  bookingStatus: Boolean
  bookedThrough: String
  bookingConfirmation: String
  attachment: String
}
type Transport {
  id: ID!
  DepartureLocationId: ID!
  departureLocation: Location!
  ArrivalLocationId: ID!
  arrivalLocation: Location!
  ItineraryId: ID!
  startLoadSequence: Int
  endLoadSequence: Int
  date: Int
  departureTime: Int!
  arrivalTime: Int!
  name: String
  notes: String
  cost: Int
  currency: String
  bookingStatus: Boolean
  bookedThrough: String
  bookingConfirmation: String
  attachment: String
  type: String
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
input LoadSequence {
  type: String!
  id: Int!
  loadSequence: Int!
}
input googlePlaceData {
  placeId: String!
  countryCode: String
  name: String
  latitude: Float
  longitude: Float
  openingHour: String
  closingHour: String
  address: String
}
type Query {
  allCountries: [Country!]!
  allUsers: [User!]!
  allItineraries: [Itinerary]
  findUser(id: ID!): User
  findItinerary(id: ID!): Itinerary
  findLocation(id: ID!): Location
  findActivity(id: ID!): Activity
  findFood(id:ID!): Food
  findLodging(id:ID!): Lodging
  findFlight(id:ID!): Flight
  findTransport(id:ID!): Transport
  authorization: AuthorizationStatus
  findCountriesItineraries(CountryId: ID!, ItineraryId: ID!): CountriesItineraries
  permissions(UserId: ID!, ItineraryId: ID!): UsersItineraries
}
type Mutation {
  changingLoadSequence(input:[LoadSequence]): Boolean

  createUser(name:String!,email:String!,CountryId:Int!,password:String!): User

  updateUser(id:ID!,name:String, email:String, CountryId:Int,password:String, profilePic:String):User

  deleteUser(id:ID!): DeletedStatus

  createToken(email:String!, password:String!): Token

  createItinerary(UserId: Int!, countryCode: String, name:String!,startDate:Int,endDate:Int,pax:Int,travelInsurance:String,budget:Int): Itinerary

  updateItineraryDetails(id: ID!, name:String,startDate:Int,endDate:Int,pax:Int,travelInsurance:String,budget:Int): Itinerary

  createCountriesItineraries(ItineraryId: Int!, CountryId:Int!): CountriesItineraries

  deleteCountriesItineraries(ItineraryId: Int!, CountryId:Int!): DeletedStatus

  deleteItinerary(id: ID!): DeletedStatus

  createLocation(placeId: String!, CountryId: ID, name:String, latitude:String, longitude:String,openingHour:String,closingHour:String,address:String): Location

  createActivity(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, date: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: String, bookedThrough: String, bookingConfirmation: String, attachment: String): Activity

  updateActivity(id: ID!, googlePlaceData: googlePlaceData, date: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: String, bookedThrough: String, bookingConfirmation: String, attachment: String): Activity

  deleteActivity(id:ID!): DeletedStatus

  createFlight(ItineraryId: ID!, DepartureLocationId: ID!, ArrivalLocationId: ID!, arrivalTerminal: String, arrivalGate: String, departureTerminal: String, departureGate: String,departureLoadSequence: Int, arrivalLoadSequence: Int, departureDate: Int, departureTime: Int, arrivalDate: Int, arrivalTime: Int, boardingTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String): Flight

  updateFlight(id: ID!, DepartureLocationId: ID!, ArrivalLocationId: ID!, arrivalTerminal: String, arrivalGate: String, departureTerminal: String, departureGate: String,departureLoadSequence: Int, arrivalLoadSequence: Int, departureDate: Int, departureTime: Int, arrivalDate: Int, arrivalTime: Int, boardingTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String): Flight

  deleteFlight(id:ID!): DeletedStatus

  createLodging(ItineraryId: ID!, startLoadSequence: Int, endLoadSequence:Int, name: String, notes: String, startDate: Int, startTime: Int, endDate: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, roomType: String): Lodging

  updateLodging(id: ID!, LocationId: ID, startLoadSequence: Int, endLoadSequence:Int, name: String, notes: String, startDate: Int, startTime: Int, endDate: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, roomType: String): Lodging

  deleteLodging(id:ID!): DeletedStatus

  createFood(ItineraryId: ID!, LocationId: ID!, date: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, type: String): Food

  updateFood(id: ID!, LocationId: ID, date: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, type: String): Food

  deleteFood(id:ID!): DeletedStatus

  createTransport(DepartureLocationId: ID!, ArrivalLocationId: ID!, startLoadSequence: Int, endLoadSequence: Int, date: Int, departureTime: Int, arrivalTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, type: String): Transport

  updateTransport(id: ID!, DepartureLocationId: ID, ArrivalLocationId: ID, loadSequence: Int, date: Int, departureTime: Int, arrivalTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, type: String): Transport

  deleteTransport(id:ID!): DeletedStatus
}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
