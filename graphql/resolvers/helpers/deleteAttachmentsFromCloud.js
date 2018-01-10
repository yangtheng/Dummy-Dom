const db = require('../../connectors')
const generateCloudStorageToken = require('./generateCloudStorageToken'
)
const fetch = require('node-fetch')

// GIVEN A MODEL NAME AND ID, REMOVE ALL ATTACHMENTS FOR THAT EVENT FROM CLOUD STORAGE
function deleteAttachmentsFromCloud (model, modelId) {
  var cloudStorageTokenPromise = generateCloudStorageToken()
  .then(e => {
    return e.token
  })
  var allAttachmentsPromise = db.Attachment.findAll({where: {
    [`${model}Id`]: modelId
  }})
  .then(allAttachments => {
    var fileNamesArr = []
    allAttachments.forEach(e => {
      fileNamesArr.push(e.fileName)
    })
    return fileNamesArr
  })

  var uriBase = process.env.CLOUD_DELETE_URI

  return Promise.all([cloudStorageTokenPromise, allAttachmentsPromise])
    .then(values => {
      var cloudStorageToken = values[0]
      var allAttachments = values[1]

      var deletedStatusPromises = []

      allAttachments.forEach(objName => {
        objName = objName.replace('/', '%2F')
        var uriFull = uriBase + objName
        var deletedStatus = fetch(uriFull, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${cloudStorageToken}`
          }
        })
        .then(response => {
          console.log(response)
          return (response.status === 204)
        })
        .catch(err => console.log(err))
        deletedStatusPromises.push(deletedStatus)
      })

      // await all attachments to finish deleting before exiting fxn
      return Promise.all(deletedStatusPromises)
        .then(() => {
          return true
        })
        .catch(err => {
          console.log(err)
          return false
        })
    })
}

module.exports = deleteAttachmentsFromCloud
