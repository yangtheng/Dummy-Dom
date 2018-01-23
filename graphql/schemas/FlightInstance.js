const FlightInstance = `
  type FlightInstance {
    id: ID!
    FlightBookingId: ID!
    flightNumber: Int
    airlineCode: String
    airlineName: String
    departureIATA: String
    arrivalIATA: String
    departureCityCountry: String
    arrivalCityCountry: String
    DepartureLocationId: ID!
    departureLocation: Location!
    ArrivalLocationId: ID!
    arrivalLocation: Location!
    departureTerminal: String
    arrivalTerminal: String
    departureGate: String
    arrivalGate: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    durationMins: Int
    startLoadSequence: Int
    endLoadSequence: Int
    notes: String
    firstFlight: Boolean
  }
`
module.exports = FlightInstance
