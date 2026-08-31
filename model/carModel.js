import mongoose from "mongoose";
import dbConnection from "../config/config.js";

const carSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
       required: true
    },
    model: {
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    cloudinary_Id:{
        type:String,
    },
    description: {
        type: String,
        required: true
    },
    fuelType: {
       type: String,
        required: true
   },
    capacity:{
       type: Number,
       required: true

    },
    priceMonthly: {
       type: Number,
       min: 2,
        required: true
    },
    shifting: {
        type: String,
        required: true,
    },
    milage:{
        type: Number,
        required: true
    },
    features:{
        type: Array,
        
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        default: null,// B/c the car post is always posted before orders (order post exist. that is why we set null by default is the order is not exist.
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
        
});

const car = dbConnection.model('cars', carSchema);

export default car;