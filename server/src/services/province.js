
import db from '../models'
import { Op } from 'sequelize'
import { v2 as cloadinary } from 'cloudinary'
import { v4 as generateId } from 'uuid'
import { deleteArrayImage } from '../helpers/cloudinaryHelper'
export const getProvince = ({ code }) => new Promise(async (resolve, reject) => {
    try { 
        const response = await db.Province.findAll({
            raw: true,
            nested: true,
            attributes: ['name', 'code'] 
        })  
        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got provinces' : 'Can not found province',
            data: response
        })
    } catch (error) {
        console.log(error);
        reject('this is reject')
    }
})
export const getDistrict = ({ code }) => new Promise(async (resolve, reject) => {
    try {
        console.log(code);
        if (!code) {
            code = { [Op.gte]: 0 }
        }
        const response = await db.District.findAndCountAll({
            where: { pCode: code }, 
            attributes: ['name', 'code'] 
        })
        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got districts' : 'Can not found district',
            data: response
        })
    } catch (error) {
        console.log(error);
        reject('this is reject')
    }
})

export const getWard = ({ code }) => new Promise(async (resolve, reject) => {
    try {
        if (!code) {
            code = { [Op.gte]: 0 }
        } 
        const response = await db.Ward.findAndCountAll({
            where: { dCode: code },
            attributes: ['name', 'code']
        })
        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got wards' : 'Can not found ward',
            data: response
        })
    } catch (error) {
        reject('this is reject')
    }
})