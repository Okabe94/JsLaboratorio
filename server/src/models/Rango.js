module.exports = (sequelize, DataTypes) =>
  sequelize.define('Rango', {
    idRango: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    Permisos: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Rango',
    freezeTableName: true,
    timestamps: false
  })
