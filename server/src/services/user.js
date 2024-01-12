import db from '../models'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { password } from '../helpers/joi_schema';
export const getCurrent = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password', 'refresh_token']
            },
            include: [{ model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value'] },
            { model: db.Post, attributes: ['id', 'images', 'title', 'price', 'startedAt', 'expiredAt', 'roomArea', 'star', 'isHidden'], as: 'postData' }]
        })

        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got it' : 'User not found',
            data: response

        })
    } catch (error) {
        reject(error)
    }
});

export const getUsers = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAll({
            attributes: {
                exclude: ['password', 'refresh_token', 'postData']
            },
            include: [{ model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value'] },
            { model: db.Post, attributes: ['id', 'images', 'title', 'price', 'startedAt', 'expiredAt', 'roomArea', 'star', 'isHidden'], as: 'postData' }]

        })

        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got it' : 'Users not found',
            data: response

        })
    } catch (error) {
        reject(error)
    }
});
export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password']
            },
            include: [{ model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value'] },
            { model: db.Post, attributes: ['title', 'roomArea'], as: 'postData' }]
        })
        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got it' : 'User not found',
            data: response

        })
    } catch (error) {
        reject(error)
    }
});


export const updateUser = (body, id) => new Promise(async (resolve, reject) => {
    try {
        console.log(body);
        const response = await db.User.update(body, {
            where: { id },
        });
        console.log('response nhuw the naosd iasd');
        console.log(response);
        resolve({
            err: response[0] === 1 ? 1 : 0,
            msg: response[0] === 1 ? ' Update Success' : 'User not found',
            data: response

        })
    } catch (error) {
        reject(error)
    }
});

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))
export const changePassword = (body, id) => new Promise(async (resolve, reject) => {
    try { 
        const response = await db.User.findByPk(id)
        if (!response)
            resolve({
                err: 0,
                msg: 'User not found'

            }) 
        const isChecked = response &&  bcrypt.compareSync(body.oldPassword, response.password)
        if (isChecked) {
            console.log(isChecked);
            //User.update sẽ trả về số lượng record được update mà có đáp ứng đc điều kiện (where)
            // ví dụ: [0] khi không có record nào đc update.
            // [1] khi có một phần tử được đc update.
            // trong trường hợp này điều kiện là id (PK) cho nêu nếu có thì kết quả trả về luôn luôn là [1]
            const response = await db.User.update({ password: hashPassword(body.newPassword) }, {
                where: { id: id }
            })
            if (response[0] === 1) await db.BlackToken.create({ userId: id, token: body.token.access_token })
            resolve({
                err: response[0] === 1 ? 1 : 0,
                msg: response[0] === 1 ? 'Change password success!' : 'User not found'
            })
        }

        resolve({
            err: 0,
            msg: 'The old password is incorrect!'
        })
    } catch (error) {
        reject(error)
    }
});

