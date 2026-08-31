import  express from "express";
import router from "./route/index.js";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import {MongoStore} from "connect-mongo";
import configurePassport from "./config/passportConfig.js";

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.dbName,
        collectionName: 'session',
        ttl: 1000 * 24 * 60 * 60

    }),
    cookie:{
        maxAge: 1000 * 24 * 60 * 60
    },
    name: "car_rental"

}));
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use('',router);

import 'dotenv/config'

app.set( 'view engine' , 'ejs' )
app.set( 'views', 'views')
app.use( express.static('public'))
app.use( express.urlencoded({extended:true}) )
app.use( express.json() )







app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on ${PORT}`)
})