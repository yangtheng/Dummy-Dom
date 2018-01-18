const Query = `
  type Query {
    allCountries: [Country!]!
    allUsers: [User!]!
    allItineraries: [Itinerary]
    itinerariesByUser: [Itinerary]
    findUser(id: ID!): User
    findItinerary(id: ID!): Itinerary
    findLocation(id: ID!): Location
    findActivity(id: ID!): Activity
    findFood(id:ID!): Food
    findLodging(id:ID!): Lodging
    findFlightBooking(id:ID!): FlightBooking
    findFlightInstance(id: ID!): FlightInstance
    findLandTransport(id:ID!): LandTransport
    findSeaTransport(id: ID!): SeaTransport
    findTrain(id: ID!): Train
    authorization: Boolean
    findCountriesItineraries(CountryId: ID!, ItineraryId: ID!): CountriesItineraries
    permissions(UserId: ID!, ItineraryId: ID!): UsersItineraries
    findAttachment(id: ID!): Attachment
  }
`
module.exports = Query
