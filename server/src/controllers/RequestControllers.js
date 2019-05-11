const RequestModel = require('../models/Prestamo')
const CopyModel = require('../models/Copy')
const moment = require('moment')
const uuid = require('uuid/v1')
function getTime () {
  return moment().format('YYYY/MM/DD - HH:mm:ss')
}
module.exports = {
  async register (req, res) {
    try {
      const today = getTime()
      req.body.fechaPrestamo = today
      const request = req.body
      if (request.modulo.salon === '' || request.modulo.numero === '') {
        delete request['modulo']
      }
      request.reference = uuid()
      RequestModel.create(request)
      CopyModel.create(request)
      res.status(201).send({ register: true })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error' })
    }
  },
  async updateEquip (req, res) {
    const reference = req.body.reference
    const body = req.body.equipo
    var flag = true
    for (let i = 0; i < body.length; i++) {
      var equipo = body[i]
      try {
        await RequestModel.findOneAndUpdate({ reference: reference }, { $push: { equipo: equipo } })
        await CopyModel.findOneAndUpdate({ reference: reference }, { $push: { equipo: equipo } })
      } catch (err) {
        flag = false
        res.status(500).send({ error: 'Ha ocurrido un error añadiendo el equipo' })
        break
      }
    }
    if (flag) {
      res.status(201).send({ updated: true })
    }
  },
  async updateMod (req, res) {
    try {
      const reference = req.body.reference
      const { salon, numero } = req.body
      await RequestModel.findOneAndUpdate({ reference: reference }, { $set: { modulo: { salon, numero } } })
      await CopyModel.findOneAndUpdate({ reference: reference }, { $set: { modulo: { salon, numero } } })
      res.status(200).send({ updated: true })
    } catch (err) {
      console.log(err)
      res.status(500).send({ error: 'Ha ocurrido un error añadiendo el módulo' })
    }
  },
  async deleteItem (req, res) {
    const requestId = req.body.requestId
    const equipId = req.body.equipId
    try {
      await RequestModel.findOneAndUpdate({ _id: requestId }, { $pull: { equipo: { _id: equipId } } })
      res.status(200).send({ eliminated: true })
    } catch (err) {
      res.status(500).send({ error: 'Ha ocurrido un error eliminando el equipo' })
    }
  },
  async deleteRequest (req, res) {
    const id = req.body.id
    const reference = req.body.reference
    const nombre = req.body.nombre
    const carnet = req.body.carnet
    const fechaEntrega = getTime()
    try {
      await CopyModel.findOneAndUpdate({
        reference: reference
      },
      {
        $set: {
          monitorRecibe: {
            nombre: nombre,
            carnet: carnet
          },
          fechaEntrega: fechaEntrega,
          entregado: true
        }
      })
      await RequestModel.findByIdAndDelete({ _id: id })
      res.status(201).send({ eliminated: true })
    } catch (err) {
      res.status(500).send({ error: 'Ha ocurrido un error eliminando el equipo' })
    }
  }
}
