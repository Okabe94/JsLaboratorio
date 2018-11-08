const PrestamoModel = require('../models/Prestamo')
module.exports = {
  async index (req, res) {
    try {
      const index = await PrestamoModel.find({})
      res.send({ index })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al obtener la información' })
    }
  }
}
