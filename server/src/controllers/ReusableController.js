const ReusableModel = require('../models/Reusable')

module.exports = {
  async index (req, res) {
    try {
      const index = await ReusableModel.find({})
      res.send({ index })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al obtener la información' })
    }
  },
  async indexCarrers (req, res) {
    try {
      const index = await ReusableModel.find({}, { 'carreras': 1 })
      res.send({ index })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al crear el equipo' })
    }
  },
  async indexDocuments (req, res) {
    try {
      const index = await ReusableModel.find({}, { 'tipo_documento': 1 })
      res.send({ index })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al crear el equipo' })
    }
  }
}
