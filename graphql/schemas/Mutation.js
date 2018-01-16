const Mutation = `
  type Mutation {
    changingLoadSequence(input:[LoadSequence]): Boolean

    createUser(name:String!,email:String!,CountryId:Int!,password:String!): User

    updateUser(id:ID!,name:String, email:String, CountryId:Int,password:String, profilePic:String):User

    deleteUser(id:ID!): Boolean

    createToken(email:String!, password:String!): String

    createItinerary(UserId: Int!, CountryId: Int, name:String!, days: Int!, startDate:Int): Itinerary

    updateItineraryDetails(id: ID!, name:String, days: Int, startDate:Int): Itinerary

    createCountriesItineraries(ItineraryId: Int!, countryCode: String!): CountriesItineraries

    deleteCountriesItineraries(ItineraryId: Int!, CountryId:Int!): Boolean

    deleteItinerary(id: ID!): Boolean

    createLocation(placeId: String!, CountryId: ID, name:String, telephone: String, latitude:String, longitude:String, address:String, utcOffset: Int, openingHours: String, openingHoursText: String): Location

    createActivity(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, locationAlias: String, startDay: Int, endDay: Int, loadSequence: Int, description: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String, openingHoursValidation: String, allDayEvent: Boolean): Activity

    updateActivity(id: ID!, googlePlaceData: googlePlaceData, locationAlias: String, startDay: Int, endDay: Int, startTime: Int, endTime: Int, loadSequence: Int, cost: Int, currency: String, description: String, notes: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, addAttachments: [attachmentInput], removeAttachments: [ID], openingHoursValidation: String, allDayEvent: Boolean): Activity

    deleteActivity(id:ID!): Boolean

    createFlightBooking(ItineraryId: ID!, paxAdults: Int, paxChildren: Int, paxInfants: Int, cost: Int, currency: String, classCode: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, attachments: [attachmentInput], flightInstances: [createFlightInstanceInput]): FlightBooking

    updateFlightBooking(id: ID!, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, flightInstances: [updateFlightInstanceInput]): FlightBooking

    deleteFlightBooking(id:ID!): Boolean

    createLodging(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, locationAlias: String, startLoadSequence: Int, endLoadSequence:Int, description: String, notes: String, startDay: Int, endDay: Int, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String): Lodging

    updateLodging(id: ID!, googlePlaceData: googlePlaceData, locationAlias: String, startLoadSequence: Int, endLoadSequence:Int, description: String, notes: String, startDay: Int, endDay: Int,  startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String): Lodging

    deleteLodging(id:ID!): Boolean

    createFood(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, locationAlias: String, startDay: Int,  endDay: Int, loadSequence: Int, description: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String, openingHoursValidation: String, allDayEvent: Boolean): Food

    updateFood(id: ID!, googlePlaceData: googlePlaceData, locationAlias: String, startDay: Int, endDay: Int, loadSequence: Int, description: String, notes: String, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, addAttachments: [attachmentInput], removeAttachments: [ID], openingHoursValidation: String, allDayEvent: Boolean): Food

    deleteFood(id:ID!): Boolean

    createLandTransport(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String): LandTransport

    updateLandTransport(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String): LandTransport

    deleteLandTransport(id:ID!): Boolean

    createSeaTransport(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String): SeaTransport

    updateSeaTransport(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String): SeaTransport

    deleteSeaTransport(id:ID!): Boolean

    createTrain(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String): Train

    updateTrain(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, notes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String): Train

    deleteTrain(id:ID!): Boolean

    createAttachment(eventModel: String!, id: ID!, fileName: String, fileAlias: String, fileType: String, fileSize: String): Attachment

    deleteAttachment(id: ID!): Boolean
  }
`
module.exports = Mutation
