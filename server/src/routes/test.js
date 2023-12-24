const   router = require('express').Router()
import { test } from '../controllers/test' 
import { insertDataCate} from '../controllers/insert' 
router.get('/', test) 
router.get('/insertdatacate', insertDataCate) 

export default router