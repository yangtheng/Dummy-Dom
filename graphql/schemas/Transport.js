const Transport = `
  type Transport {
    id: ID!
    DepartureLocationId: ID!
    departureLocation: Location!
    ArrivalLocationId: ID!
    arrivalLocation: Location!
    ItineraryId: ID!
    startLoadSequence: Int
    endLoadSequence: Int
    startDay: Int
    endDay: Int
    departureTime: Int!
    arrivalTime: Int!
    name: String
    notes: String
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachment: String
    type: String
  }
`
module.exports = Transport
