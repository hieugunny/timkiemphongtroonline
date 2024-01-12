const   router = require('express').Router()
import { register, login, generatetoken, logout } from '../controllers/auth'
router.post('/register', register)
router.post('/login', login)
router.post('/generatetoken', generatetoken)
router.post('/logout', logout)

export default router