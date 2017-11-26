const Activity = `
  type Activity {
    id: ID!
    ItineraryId: ID!
    itinerary: Itinerary!
    LocationId: ID
    location: Location
    loadSequence: Int
    startDay: Int
    endDay: Int
    name: String
    notes: String
    startTime: Int
    endTime: Int
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachments: [Attachment]
    backgroundImage: String
  }
`
module.exports = Activity
