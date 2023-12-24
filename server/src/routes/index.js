import user from './user'
import auth from './auth'
import insert from './insert' 
import post from './post'  
import category from './category'
import province from './province'
import test from './test'
import * as handler_errors from '../middlewares/handler_errors'
const initrouter = (app) => { 
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api/insert', insert) 
    app.use('/api/post', post)
    app.use('/api/category', category)
    app.use('/api/province', province)
    app.use('/api/test', test)
    
    app.use('/badrequest', handler_errors.badRequest)
    app.use('/interalServerError', handler_errors.interalServerError)
    app.use('/notfound', handler_errors.notFound)
}
                
module.exports = initrouter 