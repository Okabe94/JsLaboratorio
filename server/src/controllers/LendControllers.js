const { Lend } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const hola = await Lend.findAll({
        attributes: ['idPrestamo', 'Entregado']
      })
      console.log(hola.idPrestamo)
      res.send({
        response: 'hola mundo'
      })
    } catch (err) {
      res.send({
        error: 'Hubo un error'
      })
    }
  }
}
