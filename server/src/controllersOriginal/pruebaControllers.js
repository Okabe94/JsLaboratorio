const studentModel = require('../models/Estudiante')
module.exports = {
  async get (req, res) {
    try {
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
