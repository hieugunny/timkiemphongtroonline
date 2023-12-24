 import express from 'express'
import cors from 'cors'
import scrap from './spam/scraper/index' 
import initrouter from './src/routes'
require('./dbconnect')
require('dotenv').config() 
const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
// const placesRouter = express.Router()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
initrouter(app)
const port = process.env.PORT|| 8080
const listen = app.listen(port, ( ) => { 
    console.log('hello ' + listen.address.name);
})