// const db = require('../models/index')

const users = [
  {
    id: 1,
    name: 'testing'
  },
  {
    id: 2,
    name: 'another user'
  }
]

module.exports = {
  Query: {
    allUsers: () => users
    // allUsers: () => {
    //   return db.User.findAll()
    // }
  }
  // mutation if using the static array users[], modify if want to test sequelize db
  // Mutation: {
  //   createUser: (_, data) => {
  //     const newUser = Object.assign({id: users.length + 1}, data)
  //     users.push(newUser)
  //     return newUser
  //   }
  // }
}
