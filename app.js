const express = require('express')
const bodyParser = require('body-parser')

const schema = require('./graphql/schema')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()

app.use('/graphql', bodyParser.json())

app.use('/graphql', graphqlExpress(request => ({
  schema: schema,
  context: request.headers.authorization.substring(7)
})))

// app.use('/graphql', bodyParser.json(), graphqlExpress({schema, context: 'hello this is context'}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`Graphql is running on port ${port}`)
})
