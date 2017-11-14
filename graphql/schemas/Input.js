const Input = `
  input LoadSequence {
    type: String!
    id: Int!
    loadSequence: Int!
    date: Int!
  }
  input googlePlaceData {
    placeId: String!
    countryCode: String
    name: String
    latitude: Float
    longitude: Float
    address: String
    openingHours: String
  }
`
module.exports = Input
