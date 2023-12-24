const   router = require('express').Router()
const ctrls = require('../controllers/insert')
// router.post('/', ctrls.insertData) 
router.get('/', ctrls.insertDataMotel) 
router.get('/insertprovince', ctrls.insertProvinces) 

module.exports = router