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
      FlightBookingId: {
        allowNull: true,
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
      fileAlias: {
        type: Sequelize.STRING
      },
      fileType: {
        type: Sequelize.STRING
      },
      fileSize: {
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
