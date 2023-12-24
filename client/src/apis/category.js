import axios from '../axios.config'
 
export const apiGetCategories =async () => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'get',
            url: '/category/' 
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 