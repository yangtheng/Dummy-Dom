const Input = `
  input LoadSequence {
    type: String!
    id: Int!
    loadSequence: Int!
    day: Int!
    start: Boolean
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
  input attachmentInput {
    fileName: String
    fileAlias: String
    fileType: String
    fileSize: String
  }
  input flightInstanceInput {
    flightNumber: Int
    airlineCode: String
    airlineName: String
    departureIATA: String
    arrivalIATA: String
    departureTerminal: String
    arrivalTerminal: String
    departureGate: String
    arrivalGate: String
    startDate: Int
    endDate: Int
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    startLoadSequence: Int
    endLoadSequence: Int
    notes: String
  }
`
module.exports = Input
