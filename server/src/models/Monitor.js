module.exports = (sequelize, DataTypes) =>
  sequelize.define('Monitor', {
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
    tableName: 'Monitor',
    timestamps: false
  })
