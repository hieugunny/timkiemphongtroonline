const   router = require('express').Router()
import { register, login, generatetoken } from '../controllers/auth'
router.post('/register', register)
router.post('/login', login)
router.post('/generatetoken', generatetoken)

export default router