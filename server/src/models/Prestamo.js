const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prestamo = new Schema({
  estudiante: {
    nombre: String,
    carnet: Number
  },
  equipo: [
    {
      nombre: String,
      cantidad: Number,
      codBarras: Number
    }
  ],
  modulo: {
    salon: Number,
    numero: Number
  },
  monitor: {
    nombre: String,
    carnet: Number
  },
  comentario: String,
  fechaPrestamo: Date,
  fechaEntrega: Date,
  entregado: Boolean
},
{
  collection: 'Prestamo',
  versionKey: false
})

module.exports = mongoose.model('PrestamoModel', prestamo)
