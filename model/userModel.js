import mongoose from "mongoose";
import dbConnection from "../config/config.js";
import cloudinary from "../middleware/cloudinary.js";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    password:{
        type: String,
        required: true
    }



});

const user = dbConnection.model('users', userSchema);
export default user;