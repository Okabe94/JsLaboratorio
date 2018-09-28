const sequelize = require('sequelize')
const { Equipo } = require('../models')
// const { Equipo } = require('../models')
module.exports = {
  async index (req, res) {
    try {
      const mainTableInfo = await Equipo.sequelize.query('SELECT * FROM Equipo', { type: sequelize.QueryTypes.SELECT })
      res.send({
        mainTableInfo
      })
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error al obtener la información'
      })
    }
  }
}
