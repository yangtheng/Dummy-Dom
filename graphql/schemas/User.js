const User = `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    profilePic: String
    country: Country!
    itineraries: [Itinerary]
  }
`

module.exports = User
