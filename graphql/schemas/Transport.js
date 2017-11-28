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
