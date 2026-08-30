import  express from "express";
import router from "./route/index.js";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import {MongoStore} from "connect-mongo";
import configurePassport from "./config/passportConfig.js";

const app = express();
const port = 3000;
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

app.listen(port, ()=>{ console.log(`server up and running on port ${port}`)});