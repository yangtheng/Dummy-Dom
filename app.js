require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const schema = require('./graphql/schema')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()

app.use(cors())

app.use('/graphql', bodyParser.json())

function verifyToken (req, res, next) {
  // 3 possibilities here.
  // http req was set to no auth (no authorization req). hence no header
  // auth was required but no header given. (forgot to attach token)
  // token is undefined or 'undefined' or ''
  var authHeader = req.headers.authorization
  // console.log('header', authHeader)
  if (authHeader) {
    var token = authHeader.substring(7)
  }
  // console.log('token', token)

  if (token && token !== 'undefined' && token !== '') {
    // console.log('pre verify')
    var user = jwt.verify(token, process.env.JWT)
    if (user) {
      req.user = user.id
      // console.log('req.user', req.user)
    }
  }
  next()
}

app.use('/graphql', verifyToken)

app.use('/graphql', graphqlExpress(req => ({
  schema: schema,
  context: {
    user: req.user
  }
})))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`Graphql is running on port ${port}`)
})
