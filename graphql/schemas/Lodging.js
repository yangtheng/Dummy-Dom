const Lodging = `
  type Lodging {
    id: ID!
    LocationId: ID
    location: Location
    locationAlias: String
    ItineraryId: ID!
    itinerary: Itinerary
    startLoadSequence: Int
    endLoadSequence: Int
    description: String
    notes: String
    startDay: Int
    endDay: Int
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
  }
`
module.exports = Lodging
