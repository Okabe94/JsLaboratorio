module.exports = (sequelize, DataTypes) =>
  sequelize.define('Salon', {
    idSalon: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    Bloque: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'Salon',
    timestamps: false
  })
