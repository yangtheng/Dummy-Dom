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
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
        references: {
          model: {
            tableName: 'Activities'
          },
          key: 'id'
        }
      },
      FoodId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
        references: {
          model: {
            tableName: 'Food'
          },
          key: 'id'
        }
      },
      FlightId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
        references: {
          model: {
            tableName: 'Flights'
          },
          key: 'id'
        }
      },
      TransportId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
        references: {
          model: {
            tableName: 'Transports'
          },
          key: 'id'
        }
      },
      LodgingId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
        references: {
          model: {
            tableName: 'Lodgings'
          },
          key: 'id'
        }
      },
      fileName: {
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
