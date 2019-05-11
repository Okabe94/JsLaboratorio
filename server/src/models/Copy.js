const mongoose = require('mongoose')
const Schema = mongoose.Schema

const copy = new Schema({
  reference: String,
  estudiante: {
    nombre: String,
    carnet: String
  },
  equipo: [
    {
      nombre: String,
      cantidad: Number,
      codBarras: String
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
    carnet: String
  },
  monitorRecibe: {
    nombre: {
      type: String,
      default: ''
    },
    carnet: {
      type: String,
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
  }
},
{
  collection: 'Copy',
  versionKey: false
})

module.exports = mongoose.model('CopyModel', copy)
