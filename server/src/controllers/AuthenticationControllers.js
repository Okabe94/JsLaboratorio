const { Monitor } = require('../models')
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
      // const monitor =
      await Monitor.create(req.body)
      // monitor.toJSON()
      res.send({
        register: true
      })
    } catch (err) {
      res.status(400).send({
        error: 'Este monitor ya existe'
      })
    }
  },
  async login (req, res) {
    try {
      const { Carnet, Pass } = req.body
      const monitor = await Monitor.findOne({
        where: {
          Carnet: Carnet
        }
      })
      if (!monitor) {
        return res.status(403).send({
          error: 'La información de ingreso es incorrecta'
        })
      }
      const isPasswordValid = await monitor.comparePassword(Pass)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'La información de ingreso es incorrecta'
        })
      }
      const monitorJson = monitor.toJSON()
      res.send({
        monitor: monitorJson,
        token: jwtSignMonitor(monitorJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Un error ha ocurrido al intentar inicial sesión'
      })
    }
  }
}
