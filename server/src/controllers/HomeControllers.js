const PrestamoModel = require('../models/Prestamo')
module.exports = {
  async index (req, res) {
    try {
      const index = await PrestamoModel.find({})
      res.send({ index })
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error al obtener la información'
      })
    }
  },
  async indexDetail (req, res) {
    // const query = `SELECT e.Nombre as "Equipo", r.Cantidad
    // FROM Resumen r
    // INNER JOIN Equipo e ON FKEquipo = idEquipo
    // INNER JOIN Estudiante ON FKEstudiante = idEstudiante
    // WHERE Carnet = ${req.body.Carnet};`
    // console.log('query: ', query)
    // try {
    //   const homeInfoDetail = await Resumen.sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    //   console.log('homeInfoDetail: ', homeInfoDetail)
    //   res.send({
    //     homeInfoDetail
    //   })
    // } catch (err) {
    //   res.status(400).send({
    //     error: 'Ha ocurrido un error al obtener la información'
    //   })
    // }
  }
}
