const Input = `
  input LoadSequence {
    type: String!
    id: Int!
    loadSequence: Int!
    day: Int!
    start: Boolean
    diff: Int
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
    arrivalDeparture: String
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
    departureCityCountry: String
    arrivalCityCountry: String
    departureTerminal: String
    arrivalTerminal: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    durationMins: Int
    startLoadSequence: Int
    endLoadSequence: Int
    departureNotes: String
    arrivalNotes: String
    firstFlight: Boolean
    attachments: [attachmentInput]
  }

  input updateFlightInstanceInput {
    id: ID!
    flightNumber: Int,
    airlineCode: String,
    airlineName: String,
    departureIATA: String
    arrivalIATA: String
    departureCityCountry: String
    arrivalCityCountry: String
    departureTerminal: String
    arrivalTerminal: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    durationMins: Int
    startLoadSequence: Int
    endLoadSequence: Int
    departureNotes: String
    arrivalNotes: String
    firstFlight: Boolean
    addAttachments: [attachmentInput]
    removeAttachments: [ID]
  }
`
module.exports = Input
