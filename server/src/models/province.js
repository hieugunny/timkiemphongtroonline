'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      Province.hasMany(models.District, { foreignKey:'pCode', sourceKey:'code',as: 'dData'}) 
    }
  }
  Province.init({
    name: DataTypes.STRING,
    code: DataTypes.INTEGER,
    codename: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Province',
  });
  return Province;
};//Npx sequielize-cli model:generate --name District –attribute name:string,code:integer,codename:string,pCode:integer