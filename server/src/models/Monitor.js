const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (monitor, options) {
  const SALT_FACTOR = 8

  if (!monitor.changed('Pass')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(monitor.Pass, salt, null))
    .then(hash => {
      monitor.setDataValue('Pass', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const Monitor = sequelize.define('Monitor', {
    idMonitor: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Pass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FKRango: {
      type: DataTypes.INTEGER
    }
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  },
  {
    tableName: 'Monitor',
    freezeTableName: true,
    timestamps: false
  })
  Monitor.prototype.comparePassword = function (Pass) {
    return bcrypt.compareAsync(Pass, this.Pass)
  }

  return Monitor
}
