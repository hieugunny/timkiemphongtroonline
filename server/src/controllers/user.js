import * as service from "../services"
import { notFound, badRequest, interalServerError } from '../middlewares/handler_errors'
export const getUser = async (req, res) => {
    try {
        const { id } = req.user
        console.log('===========================');
        console.log(id);
        if (!id) return badRequest('user undefinded', res)
        const response = await service.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Ite1rnal server error'
        })
    }
}

export const getUsers = async (req, res) => {
    try { 
        const response = await service.getUsers()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Ite1rnal server error'
        })
    }
}
export const getCurrent = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) return badRequest('user undefinded', res)
        const response = await service.getCurrent(id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Ite1rnal server error'
        })
    }
}
export const updateUser = async (req, res) => {
    try {
        const { id } = req.user 
        console.log(req.user);
        if (!id) return badRequest('user undefinded', res)
        const response = await service.updateUser(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Ite1rnal server error'
        })
    }
} 
export const changePassword = async (req, res) => {
    try {
        const { id } = req.user 
        console.log(req.user);
        if (!id) return badRequest('user undefinded', res)
        const response = await service.changePassword(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Ite1rnal server error'
        })
    }
} 