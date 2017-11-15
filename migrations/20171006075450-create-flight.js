'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      ItineraryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Itineraries'
          },
          key: 'id'
        }
      },
      departureTerminal: {
        type: Sequelize.STRING
      },
      departureGate: {
        type: Sequelize.STRING
      },
      arrivalTerminal: {
        type: Sequelize.STRING
      },
      arrivalGate: {
        type: Sequelize.STRING
      },
      departureLoadSequence: {
        type: Sequelize.INTEGER
      },
      arrivalLoadSequence: {
        type: Sequelize.INTEGER
      },
      departureDay: {
        type: Sequelize.INTEGER
      },
      arrivalDay: {
        type: Sequelize.INTEGER
      },
      departureTime: {
        type: Sequelize.INTEGER
      },
      boardingTime: {
        type: Sequelize.INTEGER
      },
      arrivalTime: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      cost: {
        type: Sequelize.INTEGER
      },
      currency: {
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
      attachment: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Flights')
  }
}
