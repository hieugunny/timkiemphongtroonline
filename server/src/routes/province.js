const   router = require('express').Router() 
import { getDistrict,getProvince, getWard } from '../controllers/' 
router.get('/p', getProvince) 
router.get('/d', getDistrict) 
router.get('/w', getWard) 

export default router