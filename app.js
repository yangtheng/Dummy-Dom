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
  var authHeader = req.headers.authorization
  console.log('header', authHeader)
  var token = authHeader.substring(7)
  console.log('token', token)

  if (token) {
    var user = jwt.verify(token, 'coconutavocadoshake')
    if (user) {
      req.user = user.id
      console.log('req.user', req.user)
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
