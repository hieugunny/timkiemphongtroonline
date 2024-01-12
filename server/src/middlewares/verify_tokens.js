import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { badRequest, unAuth } from './handler_errors'
import db from '../models'

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return unAuth('Required authorization', res)
    const accessToken = token.split(' ')[1]
    // const resToken = await db.BlackToken.findOne({ where: { token: accessToken } }) 
    // if (resToken !== null) return unAuth('Phiên bản đã hết hạn vui lòng đăng nhập lại')
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, decoded) => {
        const isChecked = err instanceof TokenExpiredError
        if (isChecked) return unAuth('token expired', res, isChecked)
        if (err) return unAuth('token invalid', res, isChecked)
        req.user = decoded
        next()
    })
}

module.exports = {
    verifyToken
}