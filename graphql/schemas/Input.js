const Input = `
  input LoadSequence {
    type: String!
    id: Int!
    loadSequence: Int!
    day: Int!
    startTime: Int
    endTime: Int
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
