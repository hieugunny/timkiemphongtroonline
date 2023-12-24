import * as service from "../services"
export const insertData = async (req, res) => {
    try { 
        const response = await service.insertData() 
        return res.status(200).json(response)
    } catch (error) { 
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
} 
export const insertDataCate = async (req, res) => {
    try {  
        const response = await service.insertDataCate()  
        return res.status(200).json(response)
    } catch (error) { 
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
} 
export const insertDataMotel= async (req, res) => {
    try {  
        const response = await service.insertMotel()  
        return res.status(200).json(response)
    } catch (error) { 
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
} 
export const test = async (req, res) => {
    try { 
        fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(data);
          });
        const response = await service.insertData() 
        return res.status(200).json(response)
    } catch (error) { 
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
}  

export const insertProvinces= async (req, res) => {
    try {  
        const response = await service.insertProvinces()  
        return res.status(200).json(response)
    } catch (error) { 
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
} 