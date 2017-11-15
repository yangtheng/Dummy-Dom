'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      LocationId: {
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
      loadSequence: {
        type: Sequelize.INTEGER
      },
      day: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      startTime: {
        type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.INTEGER
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
      type: {
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
    return queryInterface.dropTable('Food')
  }
}
