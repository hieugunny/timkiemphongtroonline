'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here  
      // Category.hasMany(models.Category,{foreignKey: 'category_code',targetKey: 'code',  as: 'postDatas'})
      // Category.hasMany(models.Category,{foreignKey: 'category_code',targetKey: 'code',  as: 'postDatas'})
    }
  }
  Category.init({
    code: DataTypes.STRING,
    value: {
      type: DataTypes.STRING,
      // set(value) {
      //   this.setDataValue('value',value.charAt(0).toUpperCase() + value.slice(1))
      // }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};

// nknown column 'Post.address' in 'field list'",
//     sql: 'SELECT `Post`.`id`, `Post`.`title`, `Post`.`numberHouse`, `Post`.`street`, `Post`.`ward`, `Post`.`district`, `Post`.`province`, `Post`.`mobile`, `Post`.`roomArea`, `Post`.`price`, `Post`.`rentObject`, `Post`.`images`, `Post`.`expiredAt`, `Post`.`createdAt`, `Post`.`updatedAt`, `Post`.`address`, `Post`.`userDataId`, `categoryData`.`id` AS `categoryData.id`, `categoryData`.`code` AS `categoryData.code`, `categoryData`.`value` AS `categoryData.value` FROM `Posts` AS `Post` LEFT OUTER JOIN `Categories` AS `categoryData` ON `Post`.`category_code` = `categoryData`.`id` LIMIT 0, 7;',
//     parameters: undefined
//   },
//   sql: 'SELECT `Post`.`id`, `Post`.`title`, `Post`.`numberHouse`, `Post`.`street`, `Post`.`ward`, `Post`.`district`, `Post`.`province`, `Post`.`mobile`, `Post`.`roomArea`, `Post`.`price`, `Post`.`rentObject`, `Post`.`images`, `Post`.`expiredAt`, `Post`.`createdAt`, `Post`.`updatedAt`, `Post`.`address`, `Post`.`userDataId`, `categoryData`.`id` AS `categoryData.id`, `categoryData`.`code` AS `categoryData.code`, `categoryData`.`value` AS `categoryData.value` FROM `Posts` AS `Post` LEFT OUTER JOIN `Categories` AS `categoryData` ON `Post`.`category_code` = `categoryData`.`id` LIMIT 0, 7;',