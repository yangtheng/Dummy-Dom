const Location = `
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
`

module.exports = Location
