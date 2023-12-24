'use strict';
const {
  Model
} = require('sequelize');
const category = require('./category');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {foreignKey: 'role_code',targetKey: 'code', as: 'roleData'})
      User.hasMany(models.Post, { foreignKey:'userId' , as: 'postData'}) 
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    money: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    avatar: DataTypes.STRING,
    role_code: {
      type: DataTypes.STRING,
      defaultValue: 'r2'
    },
    refresh_token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};