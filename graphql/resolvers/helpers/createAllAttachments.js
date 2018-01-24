const db = require('../../connectors')

// this function takes array of data.attachments, model and modelId, and returns true or false depending on success
function createAllAttachments (array, model, modelId) {
  var attachmentPromises = []
  array.forEach(info => {
    var foreignKey = `${model}Id`
    var created = db.Attachment.create({
      [foreignKey]: modelId,
      fileName: info.fileName,
      fileAlias: info.fileAlias,
      fileType: info.fileType,
      fileSize: info.fileSize,
      arrivalDeparture: info.arrivalDeparture
    })
    attachmentPromises.push(created)
  })
  return Promise.all(attachmentPromises)
    .then(() => {
      return true
    })
    .catch(err => {
      console.log('err', err)
      return false
    })
}

module.exports = createAllAttachments
