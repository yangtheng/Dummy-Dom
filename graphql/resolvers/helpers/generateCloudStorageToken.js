const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

function generateCloudStorageToken () {
  var payload = {
    'iss': 'domatodevs@neon-rex-186905.iam.gserviceaccount.com',
    'scope': 'https://www.googleapis.com/auth/cloud-platform',
    'aud': 'https://www.googleapis.com/oauth2/v4/token',
    'exp': (Date.now() / 1000) + 3600,
    'iat': Date.now() / 1000
  }
  var token = jwt.sign(payload, process.env.CLOUD_OAUTH_PRIVATE_KEY, {algorithm: 'RS256'})
  var dataString = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${token}`

  return new Promise((resolve, reject) => {
    fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: dataString
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      var apiToken = json.access_token
      return resolve({
        expiry: payload.exp,
        token: apiToken
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
}

module.exports = generateCloudStorageToken
