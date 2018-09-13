const { Monitor } = require('../models')

module.exports = {
  async login (req, res) {
    try {
      const monitor = await Monitor.create(req.body)
      res.send(monitor.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'Este monitor ya existe'
      })
    }
  }
}
