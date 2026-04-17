'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plantas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Plantas.init({
    nombre: DataTypes.STRING,
    nombre_cientifico: DataTypes.STRING,
    tipo: DataTypes.STRING,
    riego: DataTypes.STRING,
    luz: DataTypes.STRING,
    altura_cm: DataTypes.INTEGER,
    fecha_registro: DataTypes.DATE,
   imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plantas',
  });
  return Plantas;
};
