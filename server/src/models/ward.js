'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      Ward.belongsTo(models.District,{foreignKey:'dCode', targetKey:'code', as:'dData'})

    }
  }
  Ward.init({
    name: DataTypes.STRING,
    code: DataTypes.INTEGER,
    codename: DataTypes.STRING,
    dCode: DataTypes.INTEGER,
    pCode: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ward',
  });
  return Ward;
};//Npx sequielize-cli model:generate --name Ward –attribute name:string,code:integer,codename:string,pCode:integer