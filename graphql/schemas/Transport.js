const Transport = `
  type Transport {
    id: ID!
    ItineraryId: ID!
    DepartureLocationId: ID!
    departureLocation: Location!
    ArrivalLocationId: ID!
    arrivalLocation: Location!
    startLoadSequence: Int
    endLoadSequence: Int
    startDay: Int
    endDay: Int
    startTime: Int!
    endTime: Int!
    name: String
    notes: String
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachments: [Attachment]
    type: String
    backgroundImage: String
  }
`
module.exports = Transport
