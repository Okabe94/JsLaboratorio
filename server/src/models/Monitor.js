const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (monitor, options) {
  const SALT_FACTOR = 8
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(monitor.password, salt, null))
    .then(hash => {
      monitor.setDataValue('password', hash)
    })
}

const monitor = new Schema({
  nombre: String,
  carnet: Number,
  password: String,
  rango: Number,
  cargo: String
},
{
  collection: 'Monitor',
  versionKey: false
})
monitor.pre('save', hashPassword)
monitor.pre('update', hashPassword)
monitor.methods.comparePassword = function (password) {
  return bcrypt.compareAsync(password, this.password)
}
const MonitorModel = mongoose.model('MonitorModel', monitor)
module.exports = MonitorModel
