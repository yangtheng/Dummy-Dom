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
    openingHours: [openingHoursPeriods]
    openingHoursText: [String]
  }
  type openingHoursPeriods {
    open: periodObj
    close: periodObj
  }
  type periodObj {
    day: Int
    time: String
  }
`

module.exports = Location
