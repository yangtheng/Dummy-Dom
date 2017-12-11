'use strict'
const countries = require('../data/countries.json')
const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= countries.length; i++) {
      var name = `${faker.name.firstName()} ${faker.name.lastName()}`
      var email = name.replace(' ', '_') + '@gmail.com'
      var password = `password${i}`
      var hash = bcrypt.hashSync(password, 5)

      seedArr.push({
        CountryId: i,
        name: name,
        email: email,
        password: hash,
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
