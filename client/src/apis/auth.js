import axios from '../axios.config'
 
export const apiRegister =async (payload) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/auth/register',
            data: payload
        })
        resolve(res)
    } catch (error) {
        reject(error)   
    }
});
export const apiLogin =async (payload) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/auth/login',
            data: payload
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
});
export const apiLogout =async (payload) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/auth/logout',
            data: payload
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
});