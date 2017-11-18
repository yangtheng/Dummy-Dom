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
    departureDay: Int
    arrivalDay: Int
    departureTime: Int!
    arrivalTime: Int!
    name: String
    notes: String
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachments: [Attachment]
    type: String
  }
`
module.exports = Transport
