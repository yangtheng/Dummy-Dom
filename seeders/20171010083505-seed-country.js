'use strict'
const countryList = require('country-list')()

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var countries = countryList.getNames()
    var seedArr = []
    for (var i = 0; i < countries.length; i++) {
      seedArr.push({id: i + 1, name: countries[i]})
    }
    return queryInterface.bulkInsert('Countries', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Countries', null, {})
  }
}
