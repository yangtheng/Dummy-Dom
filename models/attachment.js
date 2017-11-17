'use strict';
module.exports = function (sequelize, DataTypes) {
  var Attachment = sequelize.define('Attachment', {
    url: DataTypes.STRING
  })
  Attachment.associate = function (models) {
    Attachment.belongsTo(models.Activity)
    Attachment.belongsTo(models.Food)
    Attachment.belongsTo(models.Flight)
    Attachment.belongsTo(models.Transport)
    Attachment.belongsTo(models.Lodging)
  }

  return Attachment
}
