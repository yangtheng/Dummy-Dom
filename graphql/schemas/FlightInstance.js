const FlightInstance = `
  type FlightInstance {
    id: ID!
    FlightBookingId: ID!
    flightNumber: Int
    airlineCode: String
    airlineName: String
    DepartureLocationId: ID!
    departureLocation: Location!
    ArrivalLocationId: ID!
    arrivalLocation: Location!
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
    firstFlight: Boolean
  }
`
module.exports = FlightInstance
