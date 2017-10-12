const db = require('../graphql/connectors')

module.exports = {
  Query: {
    allCountries: () => {
      return db.Country.findAll()
    },
    allUsers: () => {
      return db.User.findAll()
    }
  },
  User: {
    country (user) {
      return user.getCountry()
    }
  },
  Mutation: {
    signUp: (__, data) => {
      console.log('data', data)
      const newUser = {
        name: data.name,
        email: data.email,
        CountryId: data.CountryId,
        password: data.password
      }
      return db.User.create(newUser)
        .then(newUser => {
          console.log('newUser', newUser)
          return newUser
        })
        .catch(err => {
          console.log('err', err)
          return err
        })
    }
  }
}
