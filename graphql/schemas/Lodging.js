const Lodging = `
  type Lodging {
    id: ID!
    LocationId: ID!
    location: Location!
    ItineraryId: ID!
    itinerary: Itinerary
    startLoadSequence: Int!
    endLoadSequence: Int!
    name: String
    notes: String
    startDate: Int
    startTime: Int
    endDate: Int
    endTime: Int
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachment: String
    roomType: String
  }
`
module.exports = Lodging
