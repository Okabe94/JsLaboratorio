const MonitorModel = require('../models/Monitor')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignMonitor (monitor) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(monitor, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const carnet = req.body.carnet
      const monitor = await MonitorModel.findOne({
        carnet: carnet
      })
      if (monitor) {
        return res.status(400).send({ error: 'Este monitor ya existe' })
      }
      const newMonitor = new MonitorModel(req.body)
      newMonitor.save()
      res.send({ register: true })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al crear el monitor' })
    }
  },
  async login (req, res) {
    try {
      const { carnet, password } = req.body
      const monitor = await MonitorModel.findOne({
        carnet: carnet
      })
      if (!monitor) {
        return res.status(403).send({ error: 'La información de ingreso es incorrecta' })
      }
      monitor.comparePassword(password, function (err, isMatch) {
        if (err) {
          return res.status(403).send({ error: 'Un error ha ocurrido al intentar iniciar sesión' })
        }
        if (!isMatch) {
          return res.status(403).send({ error: 'La información de ingreso es incorrecta' })
        }
        if (isMatch) {
          const monitorJson = monitor.toJSON()
          res.send({
            monitor: monitorJson,
            token: jwtSignMonitor(monitorJson)
          })
        }
      })
    } catch (err) {
      res.status(500).send({ error: 'Un error ha ocurrido al intentar iniciar sesión' })
    }
  }
}
