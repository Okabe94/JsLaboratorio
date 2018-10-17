const { Lend } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const lend = await Lend.findAll({
        attributes: ['idPrestamo', 'Entregado']
      })
      res.send({ lend })
    } catch (err) {
      res.send({
        error: 'Hubo un error'
      })
    }
  }
}
