const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reusable = new Schema({
  carreras: [],
  tipo_documento: []
},
{
  collection: 'Reusable',
  versionKey: false
})
const ReusableModel = mongoose.model('ReusableModel', reusable)
module.exports = ReusableModel
