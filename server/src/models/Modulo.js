module.exports = (sequelize, DataTypes) =>
  sequelize.define('Modulo', {
    idModulo: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    Numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FKSalon: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'Modulo',
    freezeTableName: true,
    timestamps: false
  })
