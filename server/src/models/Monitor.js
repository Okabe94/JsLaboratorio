const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const SALT_WORK_FACTOR = 10

const monitor = new Schema({
  nombre: String,
  carnet: String,
  documento: String,
  tipoDoc: String,
  password: String,
  rango: {
    type: Number,
    default: 2
  },
  cargo: {
    type: String,
    default: 'Monitor'
  }
},
{
  collection: 'Monitor',
  versionKey: false
})

monitor.pre('save', function (next) {
  const monitor = this
  if (!monitor.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(monitor.password, salt, null, function (err, hash) {
      if (err) {
        return next(err)
      }
      monitor.password = hash
      next()
    })
  })
})

monitor.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('MonitorModel', monitor)
