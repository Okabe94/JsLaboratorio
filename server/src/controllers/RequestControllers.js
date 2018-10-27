const RequestModel = require('../models/Prestamo')
const CopyModel = require('../models/Copy')

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
      CopyModel.create(request)
      res.status(201).send({
        register: true
      })
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error'
      })
    }
  }
}
