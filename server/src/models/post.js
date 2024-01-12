'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model { 
    static associate(models) {
      Post.belongsTo(models.Category, { foreignKey: 'category_code', targetKey: 'code', as: 'categoryData' }),
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'userData' })
      Post.hasOne(models.Payment, { foreignKey:'postId' , as: 'paymentData'})  
    } 
  }
  Post.init({
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT('long'),
    category_code: { type: DataTypes.STRING, defaultValue: 'cho-thue-phong-tro' },
    numberHouse: DataTypes.STRING,
    street: DataTypes.STRING,
    ward: DataTypes.STRING,
    district: DataTypes.STRING,
    province: DataTypes.STRING,
    userId: DataTypes.STRING,
    roomArea: DataTypes.FLOAT,
    price: { type: DataTypes.FLOAT, defaultValue: 0 },
    rentObject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [['male', 'female', 'all']],
      },
      defaultValue: 'all'
    },
    images: DataTypes.TEXT('long'),
    zalo: DataTypes.STRING,
    star: {
      type: DataTypes.STRING,
      defaultValue: '1'
    },
    isHidden: DataTypes.BOOLEAN,
    expiredAt: {
      type: DataTypes.DATE ,
      allowNull: true
    },
    startedAt: { 
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate(async (post, options) => {
    // if (!post.expiredAt) {
    //   const expiredAt = 5 * 24 * 60 * 60 * 1000
    //   post.expiredAt = expiredAt;
    // }
  });
  return Post;
};