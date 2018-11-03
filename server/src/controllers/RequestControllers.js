const RequestModel = require('../models/Prestamo')
const CopyModel = require('../models/Copy')
// const mongoose = require('mongoose')

const moment = require('moment')
module.exports = {
  async register (req, res) {
    try {
      const today = moment().format('YYYY/MM/DD - HH:mm:ss')
      req.body.fechaPrestamo = today
      const request = req.body
      if (request.modulo.salon === '' || request.modulo.numero === '') {
        delete request['modulo']
      }
      RequestModel.create(request)
      var query = await RequestModel.find({}).limit(1).sort({ fechaPrestamo: -1 })
      request.reference = query[0]._id
      CopyModel.create(request)
      res.status(201).send({
        register: true
      })
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error'
      })
    }
  },
  async addEquip (req, res) {
    const id = req.body.id
    var flag = true
    const body = req.body.equipo
    for (let i = 0; i < body.length; i++) {
      var equipo = body[i]
      try {
        await RequestModel.findOneAndUpdate({ _id: id }, { $push: { equipo: equipo } })
      } catch (err) {
        flag = false
        res.status(500).send({ error: 'Ha ocurrido un error añadiendo el equipo' })
        break
      }
    }
    if (flag) {
      res.status(201).send({
        updated: true
      })
    }
  },
  async addModule (req, res) {
    try {
      const id = req.body.id
      const { salon, numero } = req.body
      await RequestModel.findOneAndUpdate({ _id: id }, { $set: { modulo: { salon, numero } } })
      res.status(201).send({
        updated: true
      })
    } catch (err) {
      res.status(500).send({ error: 'Ha ocurrido un error añadiendo el equipo' })
    }
  }
}
