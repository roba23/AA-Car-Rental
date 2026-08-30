import mongoose from "mongoose";
import 'dotenv/config';



const url = process.env.MONGO_URL;
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

