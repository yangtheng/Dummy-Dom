'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Itineraries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      days: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.INTEGER
      },
      pax: {
        type: Sequelize.INTEGER
      },
      travelInsurance: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Itineraries')
  }
}
