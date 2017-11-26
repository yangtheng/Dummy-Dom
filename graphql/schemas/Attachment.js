const Attachment = `
  type Attachment {
    id: ID!
    ActivityId: ID
    FoodId: ID
    FlightId: ID
    TransportId: ID
    LodgingId: ID
    fileName: String
  }
`
module.exports = Attachment
