'use strict'
const countryList = require('country-list')()

module.exports = {
  up: function (queryInterface, Sequelize) {
    var countries = countryList.getNames()
    var seedArr = []
    for (var i = 0; i < countries.length; i++) {
      seedArr.push({
        name: countries[i],
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
