#!/usr/bin/env node
const { execSync } = require('child_process')
console.log('UNDO ALL')
execSync('sequelize db:migrate:undo:all')

console.log('MIGRATING')
execSync('sequelize db:migrate')

console.log('SEEDING ALL')
execSync('sequelize db:seed:all')

console.log('DONE')
