import db from '../models'
import bcrypt from 'bcryptjs'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))
export const register = ({ name, mobile, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { mobile },
            defaults: {
                name,
                mobile,
                password: hashPassword(password)
            }
        })// trả về mảng 2 phần tử, phần tử thứ 2: =false nếu user tồn tại trong csdl,
        //= true nếu user chưa tồn tại và vừa được tạo record trong csdl
        const newUser = response[0] ? response[1] : null
        console.log(response);
        const accessToken = newUser ? jwt.sign({ id: newUser.dataValues.id, mobile: newUser.dataValues.mobile, role_code: newUser.dataValues.role_code }, process.env.SECRET_KEY, { expiresIn: '15m' }) : null
        const refreshToken = newUser ? jwt.sign({ id: newUser.dataValues.id }, process.env.SECRET_REFRESHTOKEN_KEY, { expiresIn: '5d' }) : null

        resolve({
            err: newUser ? 1 : 0,
            msg: newUser ? 'Register successfully!' : 'Mobile is used!',
            'access_token': newUser ? `${accessToken}` : accessToken,
            'refresh_token': newUser ? `${refreshToken}` : refreshToken

        })
        if (refreshToken && newUser)
            await db.User.update({ refresh_token: refreshToken }, {
                where: { id: newUser.id }
            })
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});

export const login = ({ mobile, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({ where: { mobile }, raw: true })
        const isChecked = response && bcrypt.compareSync(password, response.password)
        const accessToken = isChecked ? jwt.sign({ id: response.id, mobile: response.mobile, role_code: response.role_code }, process.env.SECRET_KEY, { expiresIn: '15m' }) : null
        const refreshToken = isChecked ? jwt.sign({ id: response.id }, process.env.SECRET_REFRESHTOKEN_KEY, { expiresIn: '5d' }) : null

        resolve({
            err: isChecked ? 1 : 0,
            msg: isChecked ? 'Login successfully!' : 'Mobile or password not found!',
            'access_token': accessToken,
            'refresh_token': refreshToken
        })
        if (refreshToken && isChecked)
            await db.User.update({ refresh_token: refreshToken }, {
                where: { id: response.id }
            })
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});

export const generateToken = ({ refreshToken }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({ where: { refresh_token: refreshToken }, raw: true })
        console.log(response);
        if (response) {
            jwt.verify(refreshToken, process.env.SECRET_REFRESHTOKEN_KEY, (err, decoded) => {
                const isChecked = err instanceof TokenExpiredError
                const accessToken = !isChecked ? jwt.sign({ id: response.id, mobile: response.mobile, role_code: response.role_code }, process.env.SECRET_KEY, { expiresIn: '15m' }) : null
                resolve({
                    err: isChecked ? 1 : 0,
                    msg: accessToken ? 'OK' : 'fail to generate token',
                    'access_token': isChecked ? null : accessToken,
                    'refresh_token': isChecked ? null : refreshToken
                })
            }
            )
        } else {
            resolve({
                err: 0,
                msg: 'token invalid',
                'access_token': null,
                'refresh_token': null
            })

        }
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});