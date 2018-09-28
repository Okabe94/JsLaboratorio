const Sequelize = require('sequelize')
const { Equipo } = require('../models')
const Op = Sequelize.Op

module.exports = {
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
