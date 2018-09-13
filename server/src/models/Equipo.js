module.exports = (sequelize, DataTypes) =>
  sequelize.define('Equipo', {
    idEquipo: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    CodBarras: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Equipo',
    timestamps: false
  })
