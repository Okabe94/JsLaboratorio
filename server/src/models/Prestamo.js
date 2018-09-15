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
      allowNull: false
    }
  },
  {
    tableName: 'Prestamo',
    deleteAt: false,
    freezeTableName: true,
    createAt: 'FechaPedido',
    updateAt: 'FechaEntrega'
  })
