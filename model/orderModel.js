import mongoose from "mongoose";
import dbConnection from "../config/config.js";


const orderSchema = new mongoose.Schema({
    pickUp:{
        type: Date,
        required: true
    },
    dropOff:{
        type: Date,
        required: true
    },
    receipt:{
        type: String,
        required: true
    },
    cloudinaryId:{
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars",
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


const order = dbConnection.model('orders', orderSchema);

export default order;