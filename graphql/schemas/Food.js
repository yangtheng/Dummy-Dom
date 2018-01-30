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
    description: String
    notes: String
    startTime: Int
    endTime: Int
    utcOffset: Int
    cost: Int
    currency: String
    bookingStatus: Boolean
    bookedThrough: String
    bookingConfirmation: String
    attachments: [Attachment]
    backgroundImage: String
    openingHoursValidation: String
    allDayEvent: Boolean
  }
`
module.exports = Food
