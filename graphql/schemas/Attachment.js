const Attachment = `
  type Attachment {
    id: ID!
    ActivityId: ID
    FoodId: ID
    FlightInstanceId: ID
    LodgingId: ID
    LandTransportId: ID
    SeaTransportId: ID
    TrainId: ID
    arrivalDeparture: String
    fileName: String
    fileAlias: String
    fileType: String
    fileSize: String
  }
`
module.exports = Attachment
