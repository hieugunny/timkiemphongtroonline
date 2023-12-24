import db from '../models' 
export const getCategories =() => new Promise(async (resolve, reject) => {
    try {     
        const response = await db.Category.findAll() 
        resolve({
            err: response ? 1:0,
            msg: response ?  'Got it' : 'Cate not found',
            data: response?.map(el => {
                console.log(el.id);
                return {
                    id: el.id,
                    name: el.value,
                    code: el.code
                }
            })
        }) 
    } catch (error) {  
        reject(error) 
    } 
});