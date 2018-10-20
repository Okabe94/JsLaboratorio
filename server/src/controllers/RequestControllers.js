const studentModel = require('../models/Estudiante')

module.exports = {
  async post (req, res) {
    try {
      // añadir prestamo
      const data = await studentModel.find()
      console.log(data)
      res.status(201).send(data)
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error'
      })
    }
  }
}
