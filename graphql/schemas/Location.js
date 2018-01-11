const Location = `
  type Location {
    id: ID!
    placeId: String!
    CountryId: ID
    country: Country
    name: String
    telephone: String
    address: String
    latitude: Float
    longitude: Float
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
