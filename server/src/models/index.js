const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)
fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

//  Foreign keys
db['Rango'].hasMany(db['Monitor'], { foreignKey: 'FKRango' })
// db['Monitor'].belongsTo(db['Rango'], { foreignKey: 'FKRango' })

db['Salon'].hasMany(db['Modulo'], { foreignKey: 'FKSalon' })
// db['Modulo'].belongsTo(db['Salon'], { foreignKey: 'FKSalon' })

db['Estudiante'].hasMany(db['Resumen'], { foreignKey: 'FKEstudiante' })
// db['Resumen'].belongsTo(db['Estudiante'], { foreignKey: 'FKEstudiante' })
db['Monitor'].hasMany(db['Resumen'], { foreignKey: 'FKMonitor' })
// db['Resumen'].belongsTo(db['Monitor'], { foreignKey: 'FKMonitor' })
db['Equipo'].hasMany(db['Resumen'], { foreignKey: 'FKEquipo' })
// db['Resumen'].belongsTo(db['Equipo'], { foreignKey: 'FKEquipo' })

db['Modulo'].hasMany(db['Prestamo'], { foreignKey: 'FKModulo' })
// db['Prestamo'].belongsTo(db['Modulo'], { foreignKey: 'FKModulo' })
db['Resumen'].hasMany(db['Prestamo'], { foreignKey: 'FKResumen' })
// db['Prestamo'].belongsTo(db['Resumen'], { foreignKey: 'FKResumen' })

db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db
