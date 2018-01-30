const Event = `
  type Event {
    type: String
    modelId: ID
    day: Int
    loadSequence: Int
    start: Boolean
    time: Int
    utcOffset: Int
    timeUtcZero: Int
    Activity: Activity
    Food: Food
    Lodging: Lodging
    Flight: FlightEvent
    LandTransport: LandTransport
    SeaTransport: SeaTransport
    Train: Train
  }
`
module.exports = Event

// flight event is a row containing flight instance + booking. modelId refers to FlightBookingId
