const fs = require('fs')
var path = require('path')

var basename = path.basename(module.filename)

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
