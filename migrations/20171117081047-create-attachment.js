'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ActivityId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Activities'
          },
          key: 'id'
        }
      },
      FoodId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Food'
          },
          key: 'id'
        }
      },
      FlightId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Flights'
          },
          key: 'id'
        }
      },
      TransportId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Transports'
          },
          key: 'id'
        }
      },
      LodgingId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Lodgings'
          },
          key: 'id'
        }
      },
      url: {
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
    return queryInterface.dropTable('Attachments')
  }
}
