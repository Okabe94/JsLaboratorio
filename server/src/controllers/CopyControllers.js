const CopyModel = require('../models/Copy')
module.exports = {
  async index (req, res) {
    try {
      const index = await CopyModel.find({ entregado: true })
      res.send({ index })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al obtener la información' })
    }
  }
}
