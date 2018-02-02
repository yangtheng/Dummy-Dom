const Mutation = `
  type Mutation {
    changingLoadSequence(input:[LoadSequence]): Boolean

    createUser(name:String!,email:String!,CountryId:Int!,password:String!): User

    updateUser(id:ID!,name:String, email:String, CountryId:Int,password:String, profilePic:String):User

    deleteUser(id:ID!): Boolean

    createToken(email:String!, password:String!): String

    createItinerary(UserId: Int!, CountryId: Int, name:String!, days: Int!, startDate:Int, description: String): Itinerary

    updateItineraryDetails(id: ID!, name:String, days: Int, startDate:Int, description: String): Itinerary

    createCountriesItineraries(ItineraryId: Int!, countryCode: String!): CountriesItineraries

    deleteCountriesItineraries(ItineraryId: Int!, CountryId:Int!): Boolean

    deleteItinerary(id: ID!): Boolean

    createLocation(placeId: String!, CountryId: ID, name:String, telephone: String, latitude:String, longitude:String, address:String, utcOffset: Int, openingHours: String, openingHoursText: String): Location

    createActivity(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, locationAlias: String, startDay: Int, endDay: Int, loadSequence: Int, description: String, notes: String, startTime: Int, endTime: Int, utcOffset: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String, openingHoursValidation: String, allDayEvent: Boolean): Activity

    updateActivity(id: ID!, googlePlaceData: googlePlaceData, locationAlias: String, startDay: Int, endDay: Int, startTime: Int, endTime: Int, utcOffset: Int, loadSequence: Int, cost: Int, currency: String, description: String, notes: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, addAttachments: [attachmentInput], removeAttachments: [ID], openingHoursValidation: String, allDayEvent: Boolean): Activity

    deleteActivity(id:ID!): Boolean

    createFlightBooking(ItineraryId: ID!, paxAdults: Int, paxChildren: Int, paxInfants: Int, cost: Int, currency: String, classCode: String, departureDate: Int, returnDate: Int, departureIATA: String, arrivalIATA: String, departureName: String, arrivalName: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, flightInstances: [createFlightInstanceInput]): FlightBooking

    updateFlightBooking(id: ID!, paxAdults: Int, paxChildren: Int, paxInfants: Int, cost: Int, currency: String, classCode: String, departureDate: Int, returnDate: Int, departureIATA: String, arrivalIATA: String, departureName: String, arrivalName: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, flightInstances: [updateFlightInstanceInput], changedFlight: Boolean): FlightBooking

    deleteFlightBooking(id:ID!): Boolean

    updateFlightInstance(id: ID!, FlightBookingId: ID, flightNumber: Int, airlineCode: String, airlineName: String, departureIATA: String, arrivalIATA: String, departureAirport: String, arrivalAirport: String, departureCityCountry: String, arrivalCityCountry: String, departureTerminal: String, arrivalTerminal: String, startDay: Int, endDay: Int, startTime: Int, endTime: Int, durationMins: Int, startLoadSequence: Int, endLoadSequence: Int, departureNotes: String, arrivalNotes: String, addAttachments: [attachmentInput], removeAttachments: [ID]): FlightInstance

    deleteFlightInstance(id: ID!): Boolean

    createLodging(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, locationAlias: String, startLoadSequence: Int, endLoadSequence:Int, description: String, arrivalNotes: String, departureNotes: String, startDay: Int, endDay: Int, startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String): Lodging

    updateLodging(id: ID!, googlePlaceData: googlePlaceData, locationAlias: String, startLoadSequence: Int, endLoadSequence:Int, description: String, arrivalNotes: String, departureNotes: String, startDay: Int, endDay: Int,  startTime: Int, endTime: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, addAttachments: [attachmentInput], removeAttachments: [ID]): Lodging

    deleteLodging(id:ID!): Boolean

    createFood(ItineraryId: ID!, googlePlaceData: googlePlaceData, LocationId: ID, locationAlias: String, startDay: Int,  endDay: Int, loadSequence: Int, description: String, notes: String, startTime: Int, endTime: Int, utcOffset: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String, openingHoursValidation: String, allDayEvent: Boolean): Food

    updateFood(id: ID!, googlePlaceData: googlePlaceData, locationAlias: String, startDay: Int, endDay: Int, loadSequence: Int, description: String, notes: String, startTime: Int, endTime: Int, utcOffset: Int, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, addAttachments: [attachmentInput], removeAttachments: [ID], openingHoursValidation: String, allDayEvent: Boolean): Food

    deleteFood(id:ID!): Boolean

    createLandTransport(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, departureNotes: String, arrivalNotes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String): LandTransport

    updateLandTransport(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, departureNotes: String, arrivalNotes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, addAttachments: [attachmentInput], removeAttachments: [ID]): LandTransport

    deleteLandTransport(id:ID!): Boolean

    createSeaTransport(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, departureNotes: String, arrivalNotes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String): SeaTransport

    updateSeaTransport(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, departureNotes: String, arrivalNotes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, addAttachments: [attachmentInput], removeAttachments: [ID]): SeaTransport

    deleteSeaTransport(id:ID!): Boolean

    createTrain(ItineraryId: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, departureNotes: String, arrivalNotes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, attachments: [attachmentInput], backgroundImage: String): Train

    updateTrain(id: ID!, departureGooglePlaceData: googlePlaceData, arrivalGooglePlaceData: googlePlaceData, departureLocationAlias: String, arrivalLocationAlias: String, startLoadSequence: Int, endLoadSequence: Int, startDay: Int, endDay: Int, startTime: Int, endTime: Int, departureNotes: String, arrivalNotes: String, cost: Int, currency: String, bookingStatus: Boolean, bookedThrough: String, bookingConfirmation: String, backgroundImage: String, addAttachments: [attachmentInput], removeAttachments: [ID]): Train

    deleteTrain(id:ID!): Boolean

    createAttachment(eventModel: String!, id: ID!, fileName: String, fileAlias: String, fileType: String, fileSize: String, arrivalDeparture: String): Attachment

    deleteAttachment(id: ID!): Boolean
  }
`
module.exports = Mutation
