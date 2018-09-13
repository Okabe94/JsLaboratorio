module.exports = (sequelize, DataTypes) =>
  sequelize.define('Estudiante', {
    idEstudiante: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PlanAcademico: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Estudiante',
    timestamps: false
  })
