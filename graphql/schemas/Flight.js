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
    startLoadSequence: Int
    endLoadSequence: Int
    startDay: Int
    endDay: Int
    startTime: Int
    boardingTime: Int
    endTime: Int
    name: String
    notes: String
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachments: [Attachment]
    backgroundImage: String
  }
`
module.exports = Flight
