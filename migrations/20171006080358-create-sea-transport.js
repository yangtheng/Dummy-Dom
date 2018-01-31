'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SeaTransports', {
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
      departureLocationAlias: {
        type: Sequelize.STRING
      },
      arrivalLocationAlias: {
        type: Sequelize.STRING
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
      startLoadSequence: {
        type: Sequelize.INTEGER
      },
      endLoadSequence: {
        type: Sequelize.INTEGER
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
      departureNotes: {
        type: Sequelize.TEXT
      },
      arrivalNotes: {
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
      backgroundImage: {
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
    return queryInterface.dropTable('SeaTransports')
  }
}
