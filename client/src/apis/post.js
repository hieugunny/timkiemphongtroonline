import axios from '../axios.config'
 
export const apiGetPosts =async (params) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'get',
            url: '/post/',
            params
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 