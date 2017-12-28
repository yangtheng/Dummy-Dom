const Attachment = `
  type Attachment {
    id: ID!
    ActivityId: ID
    FoodId: ID
    FlightId: ID
    LodgingId: ID
    LandTransportId: ID
    SeaTransportId: ID
    TrainId: ID
    fileName: String
    fileAlias: String
    fileType: String
    fileSize: String
  }
`
module.exports = Attachment
