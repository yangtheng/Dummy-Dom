const Event = `
  type Event {
    type: String
    modelId: ID
    day: Int
    loadSequence: Int
    start: Boolean
    Activity: Activity
    Food: Food
    Transport: Transport
    Flight: FlightEvent
    Lodging: Lodging
  }
`
module.exports = Event

// flight event is a row containing flight instance + booking. modelId refers to FlightBookingId
