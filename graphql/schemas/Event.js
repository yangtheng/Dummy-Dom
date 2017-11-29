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
    Flight: Flight
    Lodging: Lodging
  }
`
module.exports = Event
// data: EventUnion
