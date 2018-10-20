const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Equip = new Schema({
  codBarras: Number,
  nombre: String,
  descripcion: String,
  disponible: {
    type: Boolean,
    default: true
  }
},
{
  collection: 'Equipo',
  versionKey: false
})
const EquipModel = mongoose.model('EquipModel', Equip)
module.exports = EquipModel
