const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    height: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: 'https://i.postimg.cc/TYsy6Z8c/desconocido.png'
    }
  },
  { timestamps: false }

  )
}
