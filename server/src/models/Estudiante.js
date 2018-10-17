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
module.exports = studentModel
