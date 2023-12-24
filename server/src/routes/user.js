const router = require('express').Router()
const user = require('../controllers/user')
import {verifyToken} from '../middlewares/verify_tokens'
import {isRoleAdmin, isRoleUser} from '../middlewares/verify_roles'

router.use(verifyToken)
// router.use(isRoleAdmin)
router.get('/getuser', user.getUser)
router.get('/getcurrent', user.getCurrent)

module.exports = router