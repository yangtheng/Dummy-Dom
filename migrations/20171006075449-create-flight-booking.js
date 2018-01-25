'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('FlightBookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ItineraryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Itineraries'
          },
          key: 'id'
        }
      },
      paxAdults: {
        type: Sequelize.INTEGER
      },
      paxChildren: {
        type: Sequelize.INTEGER
      },
      paxInfants: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING
      },
      classCode: {
        type: Sequelize.STRING
      },
      departureDate: {
        type: Sequelize.INTEGER
      },
      returnDate: {
        type: Sequelize.INTEGER
      },
      departureIATA: {
        type: Sequelize.STRING
      },
      arrivalIATA: {
        type: Sequelize.STRING
      },
      departureName: {
        type: Sequelize.STRING
      },
      arrivalName: {
        type: Sequelize.STRING
      },
      bookingStatus: {
        type: Sequelize.BOOLEAN
      },
      bookedThrough: {
        type: Sequelize.STRING
      },
      bookingConfirmation: {
        type: Sequelize.STRING
      },
      backgroundImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('FlightBookings')
  }
}
