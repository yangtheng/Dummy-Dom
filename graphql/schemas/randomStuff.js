const randomStuff = `
  type CountriesItineraries {
    CountryId: ID!
    ItineraryId: ID!
  }
  type UsersItineraries {
    UserId: ID!
    ItineraryId: ID!
    permissions: String!
  }
  type AuthorizationStatus {
    status: Boolean
  }
  type Token {
    token: String
  }
  input LoadSequence {
    type: String!
    id: Int!
    loadSequence: Int!
    date: Int!
    startTime: Int
    endTime: Int
  }
  input googlePlaceData {
    placeId: String!
    countryCode: String
    name: String
    latitude: Float
    longitude: Float
    openingHour: String
    closingHour: String
    address: String
  }
`
module.exports = randomStuff
