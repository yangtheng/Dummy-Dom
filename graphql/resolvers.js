const db = require('../graphql/connectors')

module.exports = {
  Query: {
    allCountries: () => {
      return db.Country.findAll()
    },
    allUsers: () => {
      return db.User.findAll()
    },
    findUser: (__, data) => {
      console.log('data is', data)
      return db.User.findById(data.id)
    }
  },
  User: {
    country (user) {
      return user.getCountry()
    }
  },
  Mutation: {
    signUp: (__, data) => {
      const newUser = {
        name: data.name,
        email: data.email,
        CountryId: data.CountryId,
        password: data.password
      }
      return db.User.create(newUser)
    },
    deleteUser: (__, data) => {
      return db.User.destroy({where: {id: data.id}})
        .then((deleted) => {
          console.log('deleted', deleted)
          if (deleted === 0) {
            return {status: false}
          } else if (deleted === 1) {
            return {status: true}
          }
        })
    }
  }
}
