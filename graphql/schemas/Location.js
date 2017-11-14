const Location = `
  type Location {
    id: ID!
    placeId: String!
    CountryId: ID
    name: String
    latitude: Float
    longitude: Float
    address: String
    country: Country
    openingHours: [String]
  }
`

module.exports = Location
