import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { password } from '../helpers/joi_schema';
export const getCurrent = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password','refresh_token']
            },
            include: [{ model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value'] },
                        { model: db.Post, attributes: ['title','roomArea'], as: 'postData' }]
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

export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password']
            },
            include: [{ model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value'] },
                        { model: db.Post, attributes: ['title','roomArea'], as: 'postData' }]
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
