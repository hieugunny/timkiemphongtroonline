'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Category, { foreignKey: 'category_code', targetKey: 'code', as: 'categoryData' }),
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'userData' })
      // models.User.hasMany(Post, {foreignKey:'mobile',as:'postData'})
    }
    // getAddress() {
    //   return `${this.numberHouse} ${this.street}, phường ${this.ward}, quận ${this.district}, ${this.province} `
    // }
    // setExpiredDate(days) {
    //   const expirationDate = new Date(Date.now() + days * 25 * 60 * 60 * 1000)
    //   this.setDataValue('expiredAt', expirationDate)
    // }
  }
  Post.init({
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT('long'),
    category_code: { type: DataTypes.STRING, defaultValue: 'cho-thue-phong-tro' },
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
    expiredAt: {
      type: DataTypes.DATE,
      defaultValue: function () {
        return new Date(Date.now() + 5 * 60 * 24 * 60 * 1000);
      },
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate(async (post, options) => {
    if (!post.expiredAt) {
      const expiredAt = 5 * 24 * 60 * 60 * 1000
      post.expiredAt = expiredAt;
    }
  });
  return Post;
};