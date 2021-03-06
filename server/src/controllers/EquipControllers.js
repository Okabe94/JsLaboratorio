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
        await EquipModel.create(req.body)
        res.send({ register: true })
      }
    } catch (err) {
      res.status(500).send({ error: 'Ha ocurrido un error al crear el equipo' })
    }
  },
  async update (req, res) {
    const body = req.body
    try {
      await EquipModel.findOneAndUpdate({ codBarras: body.originalCod }, {
        $set: {
          nombre: body.nombre,
          codBarras: body.codBarras,
          descripcion: body.descripcion
        }
      })
      res.status(200).send({ success: true })
    } catch (err) {
      res.status(500).send({ error: 'Ha ocurrido un error al actualizar el equipo' })
    }
  }
}
