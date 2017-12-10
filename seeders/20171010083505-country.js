'use strict'
const countries = require('../data/countries.json')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 0; i < countries.length; i++) {
      seedArr.push({
        name: countries[i].name,
        code: countries[i].code,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Countries', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Countries', null, {})
  }
}
