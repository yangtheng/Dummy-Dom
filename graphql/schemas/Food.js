const Food = `
  type Food {
    id: ID!
    LocationId: ID
    location: Location
    locationAlias: String
    ItineraryId: ID!
    itinerary: Itinerary!
    loadSequence: Int!
    startDay: Int
    endDay: Int
    name: String
    notes: String
    type: String
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
module.exports = Food
