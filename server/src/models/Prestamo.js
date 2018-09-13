module.exports = (sequelize, DataTypes) =>
  sequelize.define('Prestamo', {
    idPrestamo: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    FKModulo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FKResumen: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Entregado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'Prestamo',
    timestamps: true,
    deleteAt: false,
    createAt: 'FechaPedido',
    updateAt: 'FechaEntrega'
  })
