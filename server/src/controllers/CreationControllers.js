const { Monitor } = require('../models')

module.exports = {
  async createMonitor (req, res) {
    try {
      console.log('hola desde monitor')
      const monitor = await Monitor.create(req.body)
      res.send(monitor.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'Este monitor ya existe'
      })
    }
  }
}
