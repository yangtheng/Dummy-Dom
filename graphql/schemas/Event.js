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
    FlightBooking: FlightBooking
    Lodging: Lodging
  }
`
module.exports = Event
// data: EventUnion
