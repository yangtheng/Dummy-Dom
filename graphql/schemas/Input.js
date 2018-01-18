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
    address: String
    telephone: String
    latitude: Float
    longitude: Float
    utcOffset: Int
    openingHours: [openingHoursPeriodsInput]
    openingHoursText: [String]
  }
  input openingHoursPeriodsInput {
    close: periodObjInput
    open: periodObjInput
  }
  input periodObjInput {
    day: Int
    time: String
  }
  input attachmentInput {
    fileName: String
    fileAlias: String
    fileType: String
    fileSize: String
  }
  input createFlightInstanceInput {
    flightNumber: Int
    airlineCode: String
    airlineName: String
    departureIATA: String
    arrivalIATA: String
    departureTerminal: String
    arrivalTerminal: String
    departureGate: String
    arrivalGate: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    startLoadSequence: Int
    endLoadSequence: Int
    notes: String
    firstFlight: Boolean
  }

  input updateFlightInstanceInput {
    id: ID!
    flightNumber: Int,
    airlineCode: String,
    airlineName: String,
    departureIATA: String
    arrivalIATA: String
    departureTerminal: String
    arrivalTerminal: String
    departureGate: String
    arrivalGate: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    startLoadSequence: Int
    endLoadSequence: Int
    notes: String,
    firstFlight: Boolean
  }
`
module.exports = Input
