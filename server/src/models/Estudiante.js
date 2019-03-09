const mongoose = require('mongoose')
const Schema = mongoose.Schema

const student = new Schema({
  nombre: String,
  carnet: Number,
  tipoDoc: String,
  planAcademico: String
},
{
  collection: 'Estudiante',
  versionKey: false
})
const StudentModel = mongoose.model('StudentModel', student)
module.exports = StudentModel
