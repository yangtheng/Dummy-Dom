// const Query = `
//   type Query {
//     findChirp: Chirp
//     findBark: Bark
//   }
// `

const Query = `
  type Query {
    allCountries: [Country!]!
    allUsers: [User!]!
    allItineraries: [Itinerary]
    itinerariesByUser(id: ID!): [Itinerary]
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
`
module.exports = Query
