const db = require('../connectors')

const Country = {
  Query: {
    allCountries: () => {
      return db.Country.findAll()
    }
  }
}

module.exports = Country
