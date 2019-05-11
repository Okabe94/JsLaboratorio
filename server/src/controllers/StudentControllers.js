const StudentModel = require('../models/Estudiante')

module.exports = {
  async register (req, res) {
    try {
      const carnet = req.body.carnet
      const student = await StudentModel.findOne({ carnet: carnet })
      if (student) {
        return res.status(403).send({ error: 'Este estudiante ya existe' })
      } else {
        StudentModel.create(req.body)
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
  },
  async update (req, res) {
    const body = req.body
    console.log(req.body)
    try {
      await StudentModel.findOneAndUpdate({ carnet: body.originalCarnet }, {
        $set: {
          nombre: body.nombre,
          carnet: body.carnet,
          documento: body.documento,
          tipoDoc: body.tipoDoc,
          planAcademico: body.planAcademico
        }
      })
      res.status(200).send({ success: true })
    } catch (err) {
      res.status(401).send({ error: 'Ha ocurrido un error al actualizar la información' })
    }
  }
}
