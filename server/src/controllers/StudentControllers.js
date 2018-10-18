const StudentModel = require('../models/Estudiante')

module.exports = {
  async register (req, res) {
    try {
      const carnet = req.body.carnet
      const student = await StudentModel.findOne({
        carnet: carnet
      })
      if (student) {
        return res.status(403).send({ error: 'Este estudiante ya existe' })
      } else {
        new StudentModel(req.body).save()
        res.send({ register: true })
      }
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al crear el estudiante' })
    }
  },
  async index (req, res) {
    try {
      const index = await StudentModel.find({})
      res.send({ index })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al obtener la información' })
    }
  }
}
