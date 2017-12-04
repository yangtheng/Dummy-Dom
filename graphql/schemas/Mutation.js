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

    createActivity(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, startDay: Int, endDay: Int, loadSequence: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInfo], backgroundImage: String): Activity

    updateActivity(id: ID!, googlePlaceData: googlePlaceData, startDay: Int, endDay: Int, name: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String): Activity

    deleteActivity(id:ID!): Boolean

    createFlight(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, arrivalTerminal: String, arrivalGate: String, departureTerminal: String, departureGate: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, boardingTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, attachments: [attachmentInfo]): Flight

    updateFlight(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, arrivalTerminal: String, arrivalGate: String, departureTerminal: String, departureGate: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, boardingTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String): Flight

    deleteFlight(id:ID!): Boolean

    createLodging(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, startLoadSequence: Int, endLoadSequence:Int, name: String, notes: String, startDay: Int, endDay: Int, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, roomType: String, attachments: [attachmentInfo], backgroundImage: String): Lodging

    updateLodging(id: ID!, googlePlaceData: googlePlaceData, startLoadSequence: Int, endLoadSequence:Int, name: String, notes: String, startDay: Int, endDay: Int,  startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, roomType: String, backgroundImage: String): Lodging

    deleteLodging(id:ID!): Boolean

    createFood(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, startDay: Int,  endDay: Int, loadSequence: Int, name: String, type: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInfo], backgroundImage: String): Food

    updateFood(id: ID!, googlePlaceData: googlePlaceData, startDay: Int, endDay: Int, name: String, type: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String): Food

    deleteFood(id:ID!): Boolean

    createTransport(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, type: String, attachments: [attachmentInfo], backgroundImage: String): Transport

    updateTransport(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, name: String, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, type: String, backgroundImage: String): Transport

    deleteTransport(id:ID!): Boolean

    createAttachment(event: String!, id: ID!, fileName: String, fileAlias: String, fileType: String, fileSize: String): Attachment

    deleteAttachment(id: ID!): Boolean
  }
`
module.exports = Mutation
