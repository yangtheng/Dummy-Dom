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
    findFlight(id:ID!): Flight
    findTransport(id:ID!): Transport
    authorization: Boolean
    findCountriesItineraries(CountryId: ID!, ItineraryId: ID!): CountriesItineraries
    permissions(UserId: ID!, ItineraryId: ID!): UsersItineraries
  }
`
module.exports = Query
