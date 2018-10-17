const { Prestamo } = require('../models')

module.exports = {
  async get (req, res) {
    try {
      const prestamo = await Prestamo.findAll()
      res.send({
        prestamo
      })
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error al obtener la información'
      })
    }
  }
}
