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
  monitorEntrega: {
    nombre: String,
    carnet: Number
  },
  monitorRecibe: {
    nombre: String,
    carnet: Number
  },
  observacion: String,
  fechaEntrega: {
    type: String,
    default: ''
  },
  fechaPrestamo: {
    type: String,
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
