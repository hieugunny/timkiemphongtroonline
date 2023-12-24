import axios from '../axios.config'
 
export const apiGetCurrentUser =async () => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'get',
            url: '/user/getcurrent', 
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
});