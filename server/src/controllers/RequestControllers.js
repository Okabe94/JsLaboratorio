const RequestModel = require('../models/Prestamo')
const moment = require('moment')
module.exports = {
  async register (req, res) {
    try {
      const d = moment().format('YYYY/MM/DD - HH:mm:ss')
      req.body.fechaPrestamo = d
      console.log(req.body)
      RequestModel.create(req.body)
      // req.body.fechaEntrega
      // const data = await studentModel.find()
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
