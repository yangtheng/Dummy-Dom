'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('FlightInstances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FlightBookingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
        references: {
          model: {
            tableName: 'FlightBookings'
          },
          key: 'id'
        }
      },
      flightNumber: {
        type: Sequelize.INTEGER
      },
      airlineCode: {
        type: Sequelize.STRING
      },
      airlineName: {
        type: Sequelize.STRING
      },
      departureIATA: {
        type: Sequelize.STRING
      },
      arrivalIATA: {
        type: Sequelize.STRING
      },
      departureAirport: {
        type: Sequelize.STRING
      },
      arrivalAirport: {
        type: Sequelize.STRING
      },
      departureCityCountry: {
        type: Sequelize.STRING
      },
      arrivalCityCountry: {
        type: Sequelize.STRING
      },
      DepartureLocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Locations'
          },
          key: 'id'
        }
      },
      ArrivalLocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Locations'
          },
          key: 'id'
        }
      },
      departureTerminal: {
        type: Sequelize.STRING
      },
      arrivalTerminal: {
        type: Sequelize.STRING
      },
      startDay: {
        type: Sequelize.INTEGER
      },
      endDay: {
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.INTEGER
      },
      // departureUtcOffset: {
      //   type: Sequelize.INTEGER
      // },
      // arrivalUtcOffset: {
      //   type: Sequelize.INTEGER
      // },
      durationMins: {
        type: Sequelize.INTEGER
      },
      startLoadSequence: {
        type: Sequelize.INTEGER
      },
      endLoadSequence: {
        type: Sequelize.INTEGER
      },
      departureNotes: {
        type: Sequelize.TEXT
      },
      arrivalNotes: {
        type: Sequelize.TEXT
      },
      firstFlight: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('FlightInstances')
  }
}
