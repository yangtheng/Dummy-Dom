const Itinerary = `
  type Itinerary {
    id: ID!
    name: String!
    days: Int!
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
`
module.exports = Itinerary
