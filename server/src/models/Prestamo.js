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
      codBarras: Number,
      entregado: {
        type: Boolean,
        default: false
      }
    }
  ],
  modulo: {
    salon: Number,
    numero: Number,
    entregado: {
      type: Boolean,
      default: false
    }
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
    type: Date,
    default: ''
  },
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
