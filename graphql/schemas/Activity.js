const Activity = `
  type Activity {
    id: ID!
    ItineraryId: ID!
    itinerary: Itinerary!
    LocationId: ID
    location: Location
    locationAlias: String
    loadSequence: Int
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
module.exports = Activity
