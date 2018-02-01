const FlightBooking = `
  type FlightBooking {
    id: ID!
    ItineraryId: ID!
    paxAdults: Int
    paxChildren: Int
    paxInfants: Int
    cost: Int
    currency: String
    classCode: String
    departureDate: Int
    returnDate: Int
    departureIATA: String
    arrivalIATA: String
    departureName: String
    arrivalName: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    backgroundImage: String
    flightInstances: [FlightInstance]
  }
`
module.exports = FlightBooking
