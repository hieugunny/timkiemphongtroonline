import * as service from "../services"
import {notFound, badRequest, interalServerError} from '../middlewares/handler_errors' 
export const getCategories = async (req, res) => {
    try {    
        const response = await service.getCategories()    
        return res.status(200).json(response)
    } catch (error) {    
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Ite1rnal server error'
        })
    }
} 