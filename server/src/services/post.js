
import db from '../models'
import { Op } from 'sequelize'
import { v2 as cloadinary } from 'cloudinary'
import { v4 as generateId } from 'uuid'
import { deleteArrayImage } from '../helpers/cloudinaryHelper'
export const getPosts = ({ page, limit, order, priceFrom, priceTo, roomAreaFrom, roomAreaTo, ...query }) => new Promise(async (resolve, reject) => {
    try { 
        const queries = { raw: true, nest: true }
        // raw: i dont know, nest: i dont know too
        const offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const fLimit = +limit || +process.env.LIMIT_POST
        queries.limit = fLimit
        queries.offset = offset * fLimit
        if (order) queries.order = [order]
        if (query.category_code === '' || query.category_code === 'Home') {
            delete query.category_code
        }
        if ( priceFrom &&  priceTo) { 
            if (priceFrom === priceTo) query.price = { [Op.gt]: priceTo }
            else query.price = { [Op.between]: [priceFrom, priceTo] }
        }
        if ( roomAreaFrom &&  roomAreaTo) {
            if (roomAreaFrom === roomAreaTo) query.roomArea = { [Op.gt]:roomAreaFrom }
            else query.roomArea = { [Op.between]: [roomAreaFrom, roomAreaTo] } 
        }
        
        console.log(query);
        const response = await db.Post.findAndCountAll({
            where: { ...query, isHidden: false },
            ...queries,
            attributes: { exclude: ['address', 'userDataId'] },
            order: [
                ['star', 'desc']
            ],
            include: [{
                model: db.Category, attributes: ['code', 'value'], as: 'categoryData'
            }, {
                model: db.User, attributes: { exclude: ['password', 'refresh_token', 'createdAt', 'updatedAt'] }, as: 'userData'
            }]
        })
        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got posts' : 'Can not found',
            data: response
        })
    } catch (error) {
        console.log(error);
        reject('this is reject')
    }
})
export const getPost = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findOne({
            where: { id },
            // attributes: { exclude: ['address', 'userDataId'] },
            include: [
                { model: db.Category, attributes: ['code', 'value'], as: 'categoryData' },
                { model: db.User, attributes: ['name', 'mobile', 'zalo', 'avatar'], as: 'userData', }]
        })
        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got post' : 'Post is not found',
            data: response
        })
    } catch (error) {
        console.log(error);
        reject('this is reject')
    }
})
//CREATE

//CREATE

export const extendPost = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        console.log(body);
        const { expiredAt, ...data } = body
        console.log(data);
        // const expireDate = expiredAt ? Date.now() + (+expiredAt * 24 * 60 * 60 * 1000 ): null
        // const startDate = start ? Date.now() + (+start * 24 * 60 * 60 * 1000 ): null
        const images = JSON.stringify(data?.images)
        const response = await db.Post.create({ ...data, userId, images: images })
        console.log(response);
        resolve({
            err: !response.isNewRecord ? 1 : 0,
            msg: !response.isNewRecord ? 'Created' : 'created fail'
        })
        // if (fileData && !response[1]) deleteArrayImage(fileData)
    } catch (error) {
        console.log(error);
        reject('this is reject')
        // if (fileData) deleteArrayImage(fileData) 
    }
})
export const createPost = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        console.log(body);
        const { expiredAt, ...data } = body
        console.log(data);
        const images = JSON.stringify(data?.images)
        const response = await db.Post.create({ ...data, userId, images: images })
        console.log(response);
        resolve({
            err: !response.isNewRecord ? 1 : 0,
            msg: !response.isNewRecord ? 'Created' : 'create fail'
        })
    } catch (error) {
        console.log(error);
        reject('this is reject')
    }
})
//UPDATE
export const updatePost = ({ id, ...body }) => new Promise(async (resolve, reject) => {
    try {
        console.log(body);
        console.log(id);
        const { images, ...data } = body
        const response = await db.Post.update({ images: JSON.stringify(images), ...data }, {
            where: { id: id },
        })
        console.log(response);
        console.log(response);
        resolve({
            err: response[0] == 1 ? 1 : 0,
            msg: response[0] == 1 ? 'Update post success!' : 'Update fail',
        })
    } catch (error) {
        reject('this is reject')
        console.log(error);
    }
})
//set hidden post
export const setHidden = ({ id, isHidden }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.update({ isHidden: isHidden }, {
            where: { id: id },
        })
        console.log(response);
        resolve({
            err: response[0] == 1 ? 1 : 0,
            msg: response[0] == 1 ? 'Update post HIDDEN success!' : 'Update HIDDEN fail',
            isHidden: response[0] == 1 ? isHidden : null,
        })
    } catch (error) {
        reject('this is reject')
        console.log(error);
    }
})
//DELETE
// export const deleteBook = (bids) => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.Book.destroy({
//             where: {
//                 id: bids
//             }
//         })
//         resolve({
//             err: response > 0 ? 1 : 0,
//             msg: response > 0 ? `${response} book(s) deleted` : 'Cannot delete book/ Book ID not found',
//         })
//         if (response > 0) {
//             //https://res.cloudinary.com/dndftczcp/image/upload/v1699621371/learn_nodejs/lydgy6nxontl6zu90mip.png
//             const fileNames = bids?.map(async bid => {
//                 let book = await db.Book.findOne({
//                     where: { id: bid },
//                     raw: true
//                 })
//                 return book?.image.split('/').slice(7).join('/').replace('.png', '')
//             })
//             console.log(fileNames);
//             if (fileNames) {
//                 deleteArrayImage(fileData)

//             }
//         }
//     } catch (error) {
//         reject('this is reject')
//         // if (fileData) cloadinary.uploader.destroy(fileData?.fileName)
//     }
// })