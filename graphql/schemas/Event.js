const Event = `
  type Event {
    type: String
    id: ID
    day: Int
    loadSequence: Int
    start: Boolean
    data: EventUnion
  }
`
module.exports = Event
