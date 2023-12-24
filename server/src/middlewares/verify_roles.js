import {unAuth} from '../middlewares/handler_errors'
export const isRoleUser= (req, res, next) => {  
    const { role_code } = req.user
    if(role_code !== 'R2') return unAuth('required role user ',res) 
    next()
}
export const isRoleAdmin= (req, res, next) => {  
    const { role_code } = req.user
    if(role_code !== 'R1') return unAuth('required role admin ',res) 
    next()
} 