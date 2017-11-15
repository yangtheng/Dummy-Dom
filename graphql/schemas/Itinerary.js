const Itinerary = `
  type Itinerary {
    id: ID!
    name: String!
    days: Int!
    startDate: Int
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
`
module.exports = Itinerary
