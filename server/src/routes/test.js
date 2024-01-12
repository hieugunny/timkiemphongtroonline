const router = require('express').Router()
import { test } from '../controllers/test'
import { insertDataCate, insertDataMotel } from '../controllers/insert'
router.get('/', test)
router.get('/insertDataMotel', insertDataMotel)
router.get('/insertdatacate', insertDataCate)

export default router