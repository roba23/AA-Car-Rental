<<<<<<< HEAD
import  express from "express";
import router from "./route/index.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('',router);

app.listen(port, ()=>{ console.log(`server up and running on port ${port}`)});
=======

import express from 'express'
const app = express()
import path from 'path'
const PORT = 3000
//import mongoose from 'mongoose'
//import connectDb from './config/config.js'
import methodOverride from 'method-override'
import carRoute from './route/carRoutes.js' 
//import orderRoute from './route/orderRoute'

import 'dotenv/config'

app.set( 'view engine' , 'ejs' )
app.set( 'views', 'views')
app.use( express.static('public'))
app.use( express.urlencoded({extended:true}) )
app.use( express.json() )

app.use(methodOverride("_method"))


app.use('/', carRoute)
//app.use('/order', orderRoute)


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on ${PORT}`)
})
>>>>>>> e5d9f9a (i added a new order controller file to you)
