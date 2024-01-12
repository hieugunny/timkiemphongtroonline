import joi from 'joi'

export const mobile = joi.string().pattern(/^\d{10,11}$/).required()
export const password = joi.string().min(6).required()
    
export const name = joi.string().required() 
export const title = joi.string().min(30).required()
export const category_code = joi.string().required()
export const description = joi.string().min(100).required()   
export const street= joi.string().required()
export const ward = joi.string().required()
export const district = joi.string().required()
export const province = joi.string().required()
export const price = joi.number().required()
export const roomArea = joi.number().less(1000).required()
