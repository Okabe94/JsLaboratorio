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
    Comantario: {
      type: DataTypes.TEXT
    },
    Entregado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'Prestamo',
    deleteAt: false,
    createAt: 'FechaPedido',
    updateAt: 'FechaEntrega'
  })
