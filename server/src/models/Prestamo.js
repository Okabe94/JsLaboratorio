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
    salon: {
      type: Number,
      default: 0
    },
    numero: {
      type: Number,
      default: 0
    }
  },
  monitorEntrega: {
    nombre: String,
    carnet: Number
  },
  monitorRecibe: {
    nombre: {
      type: String,
      default: ''
    },
    carnet: {
      type: Number,
      default: 0
    }
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
  },
  reference: {
    type: String,
    default: ''
  }
},
{
  collection: 'Prestamo',
  versionKey: false
})

module.exports = mongoose.model('PrestamoModel', prestamo)
