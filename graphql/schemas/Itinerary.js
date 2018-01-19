const Itinerary = `
  type Itinerary {
    id: ID!
    name: String!
    days: Int!
    startDate: Int
    description: String
    countries: [Country]
    owner: User
    users: [User!]
    events: [Event]
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

// activities: [Activity]
// food: [Food]
// lodgings: [Lodging]
// flightBookings: [FlightBooking]
// transports: [Transport]
