const mongoose = require('mongoose')
const Schema = mongoose.Schema

const copy = new Schema({
  reference: String,
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
      default: ''
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