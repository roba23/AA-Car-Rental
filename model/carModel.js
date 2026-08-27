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
    feautures:{
        type: Array,
        
    }
        

});

const car = dbConnection.model('cars', carSchema);

export default car;