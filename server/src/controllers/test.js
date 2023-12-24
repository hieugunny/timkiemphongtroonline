import * as service from "../services";
import {email,password} from '../helpers/joi_schema'
import {notFound, badRequest, interalServerError} from '../middlewares/handler_errors'
import joi from 'joi'
import fs from 'node:fs'
export const test = async (req, res) => {
    fs.readFile('./src/data/data.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log( data);
      });
    try { 
        
        const response = await service.test(req.body)  
        return res.status(200).json({response})
    } catch (error) { 
        console.log(error);
        return res.status(500).json({
            err: 0,
            message: 'Iternal server error'
        })
    }
} 