module.exports = (sequelize, DataTypes) =>
  sequelize.define('Resumen', {
    idResumen: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    FKEstudiante: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FKMonitor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FKEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'Resumen',
    freezeTableName: true,
    timestamps: false
  })
