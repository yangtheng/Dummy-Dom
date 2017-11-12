const Flight = `
  type Flight {
    id: ID!
    DepartureLocationId: ID!
    departureLocation: Location!
    ArrivalLocationId: ID!
    arrivalLocation: Location!
    ItineraryId: ID!
    departureTerminal: String
    departureGate: String
    arrivalTerminal: String
    arrivalGate: String
    departureLoadSequence: Int
    arrivalLoadSequence: Int
    departureDay: Int
    arrivalDay: Int
    departureDate: Int
    arrivalDate: Int
    departureTime: Int
    boardingTime: Int
    arrivalTime: Int
    name: String
    notes: String
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachment: String
  }
`
module.exports = Flight
