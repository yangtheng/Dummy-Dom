const Event = `
  type Event {
    type: String
    modelId: ID
    day: Int
    loadSequence: Int
    start: Boolean
    activity: Activity
    food: Food
    transport: Transport
    flight: Flight
    lodging: Lodging
  }
`
module.exports = Event
// data: EventUnion
