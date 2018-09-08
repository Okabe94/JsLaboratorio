module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    pasword: DataTypes.STRING
  }, {
    tableName: 'users'
  })
