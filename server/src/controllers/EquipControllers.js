const sequelize = require('sequelize')
const { Equipo } = require('../models')
const Op = sequelize.Op

module.exports = {
  async index (req, res) {
    try {
      const equipInfo = await Equipo.sequelize.query('SELECT * FROM Equipo', { type: sequelize.QueryTypes.SELECT })
      res.send({
        equipInfo
      })
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error al obtener la información'
      })
    }
  },
  async register (req, res) {
    try {
      const cod = req.body.CodBarras
      const equipo = await Equipo.findOne({
        where: {
          CodBarras: {
            [Op.and]: {
              [Op.eq]: cod,
              [Op.ne]: 0
            }
          }
        }
      })
      if (equipo) {
        return res.status(403).send({
          error: 'Este equipo ya existe'
        })
      } else {
        Equipo.create(req.body)
        res.send({
          register: true
        })
      }
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error al crear el equipo'
      })
    }
  }
}
