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
    age:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    birthDate:{
        type: Date,
        required: true
    },
    cloudinaryId:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true,
        default: "/images/avatar.png"
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