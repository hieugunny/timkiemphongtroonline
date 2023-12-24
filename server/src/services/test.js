import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' 

export const test = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({ where: { email }, raw: true })
        const isChecked = response && bcrypt.compareSync(password, response.password)  
        console.log(response);
        resolve({
            err: response ? 1:0,
            msg: isChecked ? 'Login successfully' : 'Email or password not true',
            'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
            'refresh_token': refreshToken ? `Bearer ${refreshToken}` : refreshToken
        })
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});