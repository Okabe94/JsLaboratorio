const EquipModel = require('../models/Equipo')

module.exports = {
  async index (req, res) {
    try {
      const index = await EquipModel.find({})
      res.send({ index })
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al obtener la información' })
    }
  },
  async register (req, res) {
    try {
      const codBarras = req.body.codBarras
      const equip = await EquipModel.findOne({
        $and: [
          { codBarras: codBarras }, { codBarras: { $ne: 0 } }
        ]
      })
      if (equip) {
        return res.status(403).send({ error: 'Este equipo ya existe' })
      } else {
        new EquipModel(req.body).save()
        res.send({ register: true })
      }
    } catch (err) {
      res.status(400).send({ error: 'Ha ocurrido un error al crear el equipo' })
    }
  }
}
