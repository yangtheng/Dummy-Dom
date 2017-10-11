'use strict'
const countryList = require('country-list')()
const casual = require('casual')
const faker = require('faker')

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
    for (var i = 1; i <= countries.length; i++) {
      var name = `${faker.name.firstName()} ${faker.name.lastName()}`
      var email = name.replace(' ', '_') + '@gmail.com'
      seedArr.push({
        id: i,
        CountryId: i,
        name: name,
        email: email,
        password: faker.internet.password(),
        profilePic: faker.image.imageUrl(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Users', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {})
  }
}
