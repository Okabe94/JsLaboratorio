const mongoose = require('mongoose')
const Schema = mongoose.Schema

const student = new Schema({
  nombre: String,
  carnet: Number,
  planAcademico: String
},
{
  collection: 'Estudiante'
})
const studentModel = mongoose.model('studentModel', student)
module.exports = {
  async get (req, res) {
    try {
      const data = await studentModel.find({})
      console.log(data)
      res.status(201).send(data)
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error'
      })
    }
  }
}
