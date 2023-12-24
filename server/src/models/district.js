'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      District.belongsTo(models.Province,{foreignKey:'pCode', targetKey:'code', as:'pData'})
      District.hasMany(models.Ward, { foreignKey:'dCode', sourceKey:'code',as: 'wData'}) 

    }
  }
  District.init({
    name: DataTypes.STRING,
    code: DataTypes.INTEGER,
    codename: DataTypes.STRING,
    pCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'District',
  });
  return District;
};//Npx sequielize-cli model:generate --name District –attribute name:string,code:integer,codename:string,pCode:integer