import * as service from "../services";
import { numberHouse, street, ward, district, description, province,title,mobile,roomArea, category_code, price } from '../helpers/joi_schema'
import { notFound, badRequest, interalServerError } from '../middlewares/handler_errors'
import joi from 'joi'
import {deleteArrayImage} from '../helpers/cloudinaryHelper'
import { v2 as cloadinary } from 'cloudinary'
export const getProvince = async (req, res) => {
    try {
        const response = await service.getProvince(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}
export const getDistrict = async (req, res) => {
    try {
        console.log(req.query);
        const response = await service.getDistrict(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}
export const getWard = async (req, res) => {
    try {
        const response = await service.getWard(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}