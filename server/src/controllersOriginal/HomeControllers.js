const sequelize = require('sequelize')
const { Prestamo } = require('../models')
const { Resumen } = require('../models')

module.exports = {
  async indexHome (req, res) {
    const query =
      `SELECT
      count(idEstudiante) as "Préstamos",
      e.Nombre as "Estudiante", e.Carnet as "Carnet", e.planAcademico as "PlanAcademico",
      s.Bloque, s.Numero as "Salon", 
      m.Numero as "Modulo", 
      n.Nombre as "Monitor"
      FROM prestamo p
      INNER JOIN Modulo m on FKModulo = idModulo
      INNER JOIN Salon s on FKSalon = idSalon
      INNER JOIN Resumen r on FKResumen = idResumen
      INNER JOIN Estudiante e on FKEstudiante = idEstudiante
      INNER JOIN Monitor n on FKMonitor = idMonitor
      INNER JOIN Equipo q on FKEquipo = idEquipo
      WHERE Entregado is 1
      group by idEstudiante;`
    try {
      const homeInfo = await Prestamo.sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      res.send({
        homeInfo
      })
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error al obtener la información'
      })
    }
  },
  async indexDetail (req, res) {
    const query = `SELECT e.Nombre as "Equipo", r.Cantidad
    FROM Resumen r
    INNER JOIN Equipo e ON FKEquipo = idEquipo
    INNER JOIN Estudiante ON FKEstudiante = idEstudiante
    WHERE Carnet = ${req.body.Carnet};`
    console.log('query: ', query)
    try {
      const homeInfoDetail = await Resumen.sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      console.log('homeInfoDetail: ', homeInfoDetail)
      res.send({
        homeInfoDetail
      })
    } catch (err) {
      res.status(400).send({
        error: 'Ha ocurrido un error al obtener la información'
      })
    }
  }
}
