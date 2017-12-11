const FlightEvent = `
  type FlightEvent {
    FlightInstance: FlightInstance
    FlightBooking: FlightBooking
  }
`
module.exports = FlightEvent

// FLIGHT BOOKING SCHEMA CONTAINS FLIGHT INSTANCES ARRAY. DO NOT REQUEST IT IN QUERY, NEEDLESS RECURSION BEWTWEEN BOOKING <=> INSTANCE
