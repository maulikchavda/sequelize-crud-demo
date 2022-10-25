'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProjectTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectTable.init(
    {
      project_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      project_unique_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      project_type: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'projects',
      tableName: 'projects',
    },
  )
  return ProjectTable
}
