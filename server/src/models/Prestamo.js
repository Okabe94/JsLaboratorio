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
  fechaEntrega: Date,
  fechaPrestamo: {
    type: Date,
    default: Date.now
  },
  entregado: {
    type: Boolean,
    default: false
  }
},
{
  collection: 'Prestamo',
  versionKey: false
})

module.exports = mongoose.model('PrestamoModel', prestamo)
