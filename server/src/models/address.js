'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.hasOne(models.Post, {foreignKey: 'address', targetKey:'fullAddress',as: 'postData'})

    }
  }
  Address.init({
    fullAddress: DataTypes.STRING,
    numberHouse: DataTypes.STRING,
    street: DataTypes.STRING,
    ward: DataTypes.STRING,
    district: DataTypes.STRING,
    province: DataTypes.STRING,  
  }, {
    sequelize,
    modelName: 'Address',
  });
  Address.beforeCreate(async (address, options) => {
    const a = `${address.numberHouse} ${address.street}, ${address.district}, ${address.ward}, ${address.province}`
    
    address.fullAddress= a;
  });
  return Address;
};
