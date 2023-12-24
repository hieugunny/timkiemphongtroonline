const   router = require('express').Router()
import {getCategories} from '../controllers/category' 
router.get('/', getCategories)

export default router 