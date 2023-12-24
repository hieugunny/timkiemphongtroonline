import * as service from "../services";
import { mobile, password, refreshToken,name} from '../helpers/joi_schema'
import { notFound, badRequest, interalServerError } from '../middlewares/handler_errors'
import joi from 'joi'
export const register = async (req, res) => {
    try {
        const { error } = joi.object({name, mobile, password }).options({allowUnknown: true }).validate(req.body)
        console.log('================');
        console.log(error);
        if (error) return badRequest(error.details[0].message, res)
        const response = await service.register(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}
export const login = async (req, res) => {
    try {
        const { error } = joi.object({ mobile, password }).options({allowUnknown: true }).validate(req.body)
        if (error) return badRequest(error.details[0].message, res)
        const response = await service.login(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}
export const generatetoken = async (req, res) => {
    try { 
        const { error } = joi.object({ refreshToken })
            .options({allowUnknown: true })
            .validate(req.body)
        if (error) return badRequest(error.details[0].message, res)
        const response = await service.generateToken(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}