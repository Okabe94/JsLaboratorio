const { Estudiante } = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const carnet = req.body.Carnet
      const estudiante = await Estudiante.findOne({
        where: {
          Carnet: carnet
        }
      })
      if (estudiante) {
        return res.status(403).send({
          error: 'Este estudiante ya existe'
        })
      } else {
        Estudiante.create(req.body)
        res.send({
          register: true
        })
      }
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error al crear el estudiante'
      })
    }
  }
}
