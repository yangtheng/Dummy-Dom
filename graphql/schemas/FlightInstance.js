const FlightInstance = `
  type FlightInstance {
    id: ID!
    FlightBookingId: ID!
    flightNumber: Int
    airlineCode: String
    airlineName: String
    departureIATA: String
    arrivalIATA: String
    departureAirport: String
    arrivalAirport: String
    departureCityCountry: String
    arrivalCityCountry: String
    DepartureLocationId: ID!
    departureLocation: Location!
    ArrivalLocationId: ID!
    arrivalLocation: Location!
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
    attachments: [Attachment]
  }
`
module.exports = FlightInstance
