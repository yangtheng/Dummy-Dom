const Food = `
  type Food {
    id: ID!
    LocationId: ID!
    location: Location!
    ItineraryId: ID!
    itinerary: Itinerary!
    loadSequence: Int!
    date: Int
    name: String
    notes: String
    startTime: Int
    endTime: Int
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachment: String
    type: String
  }
`
module.exports = Food
