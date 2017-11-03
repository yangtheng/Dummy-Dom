const Activity = `
  type Activity {
    id: ID!
    ItineraryId: ID!
    itinerary: Itinerary!
    LocationId: ID!
    location: Location!
    loadSequence: Int
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
  }
`
module.exports = Activity
