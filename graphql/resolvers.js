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
    createUser: (__, data) => {
      const newUser = {
        name: data.name,
        email: data.email,
        CountryId: data.CountryId,
        password: data.password
      }
      return db.User.create(newUser)
    },
    updateUser: (__, data) => {
      console.log('data is', data)
      return db.User.findById(data.id)
        .then((found) => {
          return found.update({
            name: data.name,
            email: data.email,
            password: data.password
          })
        })
        .then(updated => {
          return updated
        })
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


/* graphiql syntax
# {
#   findUser(id: 13) {
#     id
#     name
#     email
#     country {
#       id
#       name
#     }
#   }
# }

# mutation {
# 	deleteUser(id: 14) {
# 		status
#   }
# }

mutation {
	updateUser(
    id: 15,
    name: "Updated meh"
    email: "updatedemail@gmail.com"
    password: "BananaMangoPineapple",
    CountryId: 100
  ) {
    id
    name
    email
    profilePic
    password
    country {
      id
      name
    }
  }
}
*/
