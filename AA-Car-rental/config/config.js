<<<<<<< HEAD
=======
import dns from 'dns';//This fix mongodb connection problem.
dns.setServers(['8.8.8.8', '8.8.4.4']);

>>>>>>> e5d9f9a (i added a new order controller file to you)
import mongoose from "mongoose";
import 'dotenv/config';
const url = "mongodb+srv://eyoelsinore7_db_user:LYXpggvTqVdXFPBk@cluster0.tg0l2bi.mongodb.net/?appName=Cluster0";


//const url = `mongodb://127.0.0.1:27017/${process.env.dbName}`;
console.log("the url is:", url);
const dbConnection = mongoose.createConnection(url, {
   
});

dbConnection.on("connected", ()=>{
    console.log("succesfully connected to mongodb");
});

dbConnection.on("error", (err)=>{
    console.error("mongodb connection error: ", err);
});

export default dbConnection;

