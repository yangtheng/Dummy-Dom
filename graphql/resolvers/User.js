const db = require('../connectors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = {
  User: {
    country (user) {
      return user.getCountry()
    },
    itineraries (user) {
      return user.getItineraries()
    }
  },
  Query: {
    allUsers: () => {
      return db.User.findAll()
    },
    findUser: (__, data) => {
      return db.User.findById(data.id)
    },
    authorization: (__, data, context) => {
      if (context.user) {
        return true
      } else {
        return false
      }
    }
  },
  Mutation: {
    createUser: (__, data) => {
      var hash = bcrypt.hashSync(data.password, 10)
      const newUser = {
        name: data.name,
        email: data.email,
        CountryId: data.CountryId,
        password: hash
      }
      return db.User.create(newUser)
    },
    updateUser: (__, data) => {
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
      .then(status => {
        return status
      })
    },
    createToken: (__, data) => {
      console.log('data', data)
      return db.User.findOne({
        where: {email: data.email}
      })
      .then(found => {
        return bcrypt.compare(data.password, found.password)
        .then(compared => {
          if (compared) {
            var token = jwt.sign({id: found.id, email: found.email}, process.env.JWT)
            console.log('jwt', process.env.JWT)
            console.log('token')
            return token
          } else {
            return 'unauthorized. password incorrect'
          }
        })
      })
      .catch(err => {
        console.log('err', err)
        return err
      })
    }
  }
}

module.exports = User
