const db = require('../connectors')

const Attachment = {
  Query: {
    findAttachment: (__, data) => {
      return db.Attachment.findById(data.id)
    }
  },
  Mutation: {
    createAttachment: (__, data) => {
      var eventId = data.type + 'Id' // set the foreign key
      return db.Attachment.create({
        [eventId]: data.id,
        url: data.url
      })
    },
    deleteAttachment: (__, data) => {
      return db.Attachment.destroy({where: {id: data.id}})
    }
  }
}

module.exports = Attachment
