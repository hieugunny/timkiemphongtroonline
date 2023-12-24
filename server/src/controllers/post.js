import * as service from "../services";
import { numberHouse, street, ward, district, description, province,title,mobile,roomArea, category_code, price } from '../helpers/joi_schema'
import { notFound, badRequest, interalServerError } from '../middlewares/handler_errors'
import joi from 'joi'
import {deleteArrayImage} from '../helpers/cloudinaryHelper'
import { v2 as cloadinary } from 'cloudinary'
export const getPosts = async (req, res) => {
    try {
        const response = await service.getPosts(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}
export const create = async (req, res) => {
        const fileData = req.files 
    try {
        const { error } = joi.object({ street, ward, district, province, title,  description, price, roomArea })
            .options({ abortEarly: false, allowUnknown: true })
            .validate(req.body)
        if (error) return badRequest(error.details.map(item => item.message), res)
        const response = await service.createPost(req.body, fileData)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        deleteArrayImage(fileData)
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}
// export const update = async (req, res) => {
//     const fileData = req.file
//     try {
//         const { error } = joi.object({ bid})
//             .options({ abortEarly: false, allowUnknown: true })
//             .validate(req.body)
//         if(error) return badRequest(error.details[0].message,res)
//         const response = await service.updateBook(req.body, fileData)
//         return res.status(200).json(response)
//     } catch (error) {
//         console.log(error);
//         if (fileData) cloadinary.uploader.destroy(fileData?.fileName)
//         return res.status(500).json({
//             err: 0,
//             message: 'Iternal server error'
//         })
//     }
// }
// export const deleteBook = async (req, res) => {
//     try {
//         const { error } = joi.object({ bids})
//             .options({ abortEarly: false, allowUnknown: true })
//             .validate(req.body)
//         if(error) return badRequest(error.details[0].message,res)
//         const response = await service.deleteBook(req.body.bids)
//         return res.status(200).json(response)
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             err: 0,
//             message: 'Iternal server error'
//         })
//     }
// } 
