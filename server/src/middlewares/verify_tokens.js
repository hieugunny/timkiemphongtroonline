import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { badRequest, unAuth } from './handler_errors'

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    console.log(token);
    if (!token) return unAuth('Required authorization', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, decoded) => { 
        const isChecked = err instanceof TokenExpiredError 
        if (isChecked) return unAuth('token expired', res, isChecked)
        if(err) return unAuth('token invalid', res, isChecked)
        req.user = decoded
        next()
    })
}

module.exports = {
    verifyToken
}