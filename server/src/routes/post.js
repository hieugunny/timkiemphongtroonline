const router = require('express').Router()
const ctrls = require('../controllers/post')
import {verifyToken} from '../middlewares/verify_tokens'
import {isRoleAdmin, isRoleUser} from '../middlewares/verify_roles'
import uploadImage from '../middlewares/uploader' 
router.get('/', ctrls.getPosts)
router.get('/getone/:pid', ctrls.getOne)  
router.post('/create',verifyToken, ctrls.create)  
router.put('/update-post',verifyToken, ctrls.update)  
router.put('/set-hidden',verifyToken, ctrls.setHidden)  
// router.post('/create',verifyToken,uploadImage.array('images'), ctrls.create) 
// router.put('/update',verifyToken, isRoleAdmin, uploadImage.single('image'), ctrls.update) 
// router.delete('/', ctrls.deleteBook)
module.exports = router