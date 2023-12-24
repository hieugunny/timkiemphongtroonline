
import db from '../models'
import { Op } from 'sequelize'
import { v2 as cloadinary } from 'cloudinary'
import { v4 as generateId } from 'uuid'
import { deleteArrayImage } from '../helpers/cloudinaryHelper'
export const getPosts = ({ page, limit, order, ...query }) => new Promise(async (resolve, reject) => {
    try { 
        const queries = { raw: true, nest: true }
        // raw: i dont know, nest: i dont know too
        const offset = (!page || +page <= 1) ? 0 : (+page - 1) 
        const fLimit = +limit || +process.env.LIMIT_POST
        queries.limit = fLimit
        queries.offset = offset * fLimit 
        if (order) queries.order = [order]  
        if(query.category_code ==='' || query.category_code ==='Home') {
            delete query.category_code
        }
        if(query.price) {
            if(query.price.length ==1) query.price = {[Op.gt]: query.price[0]} 
            else query.price = {[Op.between]: query.price}
        } 
        if(query.roomArea) {
            if(query.roomArea.length ==1) query.roomArea = {[Op.gt]: query.roomArea[0]} 
            else query.roomArea = {[Op.between]: query.roomArea}
        }   

        const response = await db.Post.findAndCountAll({
            where: query,
            ...queries, 
            attributes: { exclude: ['address','userDataId' ] },
            include: [{
                model: db.Category, attributes: ['code', 'value'], as: 'categoryData'
            },{
                model: db.User ,attributes: {exclude:['password', 'refresh_token','createdAt','updatedAt']}, as: 'userData'
            }]
        })   
        resolve({
            err: response ? 1 : 0,
            msg: response ? 'Got' : 'Can not found',
            data: response
        })
    } catch (error) {
        reject('this is reject') 
    }
})

//CREATE

export const createPost = (body, fileData) => new Promise(async (resolve, reject) => {
    try {
        const { expiredAt, ...data } = body 
        console.log(data);
        const expirationDate = expiredAt ? Date.now() + +expiredAt * 24 * 60 * 60 * 1000 :null 
        const images = JSON.stringify(fileData.map(el => el.path))
        const response = await db.Post.create({ ...data,expiredAt: expirationDate , images: images })  
        console.log(response);
        resolve({
            err: !response.isNewRecord ? 1 : 0,
            msg: !response.isNewRecord ? 'Created' : 'create fail'
        })
        if (fileData && !response[1]) deleteArrayImage(fileData)
    } catch (error) {
        console.log(error);
        reject('this is reject')
        if (fileData) deleteArrayImage(fileData) 
    }
})
//UPDATE
export const updateBook = ({ bid, ...body }, fileData) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Book.update({ ...body, image: fileData?.path }, {
            where: { id: bid },
        })
        console.log(fileData);
        resolve({
            err: response ? 1 : 0,
            msg: response ? 'updated' : 'update fail',
        })
        if (fileData && response === 0) {
            console.log('da xoa anh');
            deleteArrayImage(fileData)
        }
    } catch (error) {
        reject('this is reject')
        if (fileData) deleteArrayImage(fileData) 
    }
})
//DELETE
export const deleteBook = (bids) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Book.destroy({
            where: {
                id: bids
            }
        })
        resolve({
            err: response > 0 ? 1 : 0,
            msg: response > 0 ? `${response} book(s) deleted` : 'Cannot delete book/ Book ID not found',
        })
        if (response > 0) {
            //https://res.cloudinary.com/dndftczcp/image/upload/v1699621371/learn_nodejs/lydgy6nxontl6zu90mip.png
            const fileNames = bids?.map(async bid => {
                let book = await db.Book.findOne({
                    where: { id: bid },
                    raw: true
                })
                return book?.image.split('/').slice(7).join('/').replace('.png', '')
            })
            console.log(fileNames);
            if (fileNames) { 
                deleteArrayImage(fileData)

            }
        }
    } catch (error) {
        reject('this is reject')
        // if (fileData) cloadinary.uploader.destroy(fileData?.fileName) 
    }
})