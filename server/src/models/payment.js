'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            //user - payment : 1 - m
            //post - payment : 1 - m
            Payment.belongsTo(models.User, { foreignKey: 'userId', as: 'userData', onDelete: 'CASCADE' })
            Payment.belongsTo(models.Post, { foreignKey: 'postId', as: 'postData', onDelete: 'CASCADE' })
        }
    }
    Payment.init({
        userId: { type: DataTypes.STRING, allowNull: false },
        postId: { type: DataTypes.STRING, allowNull: false },
        paymentDate: { type: DataTypes.DATE },
        status: { type: DataTypes.STRING, defaultValue: false }
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
};