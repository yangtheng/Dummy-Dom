'use strict'
const countryList = require('country-list')()
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
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
        profilePic: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Users', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
