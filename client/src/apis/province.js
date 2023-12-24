import axios from '../axios.config'
 
export const apiGetProvince =async (params) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'get',
            url: '/province/p',
            params
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 
export const apiGetDistrict =async (params) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'get',
            url: '/province/d', 
            params
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 
export const apiGetWard =async (params) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'get',
            url: '/province/w', 
            params
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 