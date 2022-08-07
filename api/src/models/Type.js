const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  sequelize.define('Type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: 'Normal'
    },
    typeImg: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    createdAt: true,
    updatedAt: false
  })
}
