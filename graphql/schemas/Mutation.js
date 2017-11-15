const Mutation = `
  type Mutation {
    changingLoadSequence(input:[LoadSequence]): Boolean

    createUser(name:String!,email:String!,CountryId:Int!,password:String!): User

    updateUser(id:ID!,name:String, email:String, CountryId:Int,password:String, profilePic:String):User

    deleteUser(id:ID!): Boolean

    createToken(email:String!, password:String!): String

    createItinerary(UserId: Int!, countryCode: String, name:String!, days: Int!, startDate:Int,pax:Int,travelInsurance:String,budget:Int): Itinerary

    updateItineraryDetails(id: ID!, name:String, days: Int, startDate:Int,pax:Int,travelInsurance:String,budget:Int): Itinerary

    createCountriesItineraries(ItineraryId: Int!, countryCode: String!): CountriesItineraries

    deleteCountriesItineraries(ItineraryId: Int!, CountryId:Int!): Boolean

    deleteItinerary(id: ID!): Boolean

    createLocation(placeId: String!, CountryId: ID, name:String, latitude:String, longitude:String,address:String, openingHours: String): Location

    createActivity(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, startDay: Int, endDay: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String): Activity

    updateActivity(id: ID!, googlePlaceData: googlePlaceData, startDay: Int, endDay: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String): Activity

    deleteActivity(id:ID!): Boolean

    createFlight(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, DepartureLocationId: ID, ArrivalLocationId: ID, arrivalTerminal: String, arrivalGate: String, departureTerminal: String, departureGate: String,departureLoadSequence: Int, arrivalLoadSequence: Int, departureDay: Int, arrivalDay: Int, departureTime: Int, arrivalTime: Int, boardingTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String): Flight

    updateFlight(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, DepartureLocationId: ID, ArrivalLocationId: ID, arrivalTerminal: String, arrivalGate: String, departureTerminal: String, departureGate: String,departureLoadSequence: Int, arrivalLoadSequence: Int, departureDay: Int, arrivalDay: Int, departureTime: Int, arrivalTime: Int, boardingTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String): Flight

    deleteFlight(id:ID!): Boolean

    createLodging(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, startLoadSequence: Int, endLoadSequence:Int, name: String, notes: String, departureDay: Int, arrivalDay: Int, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, roomType: String): Lodging

    updateLodging(id: ID!, googlePlaceData: googlePlaceData, startLoadSequence: Int, endLoadSequence:Int, name: String, notes: String, departureDay: Int, arrivalDay: Int,  startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, roomType: String): Lodging

    deleteLodging(id:ID!): Boolean

    createFood(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, startDay: Int,  endDay: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, type: String): Food

    updateFood(id: ID!, googlePlaceData: googlePlaceData, startDay: Int, endDay: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, type: String): Food

    deleteFood(id:ID!): Boolean

    createTransport(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, DepartureLocationId: ID, ArrivalLocationId: ID, startLoadSequence: Int, endLoadSequence: Int, departureDay: Int, arrivalDay: Int, departureTime: Int, arrivalTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, type: String): Transport

    updateTransport(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, DepartureLocationId: ID, ArrivalLocationId: ID, loadSequence: Int, departureDay: Int, arrivalDay: Int, departureTime: Int, arrivalTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachment: String, type: String): Transport

    deleteTransport(id:ID!): Boolean
  }
`
module.exports = Mutation
