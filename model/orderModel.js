import mongoose from "mongoose";
import dbConnection from "../config/config.js";

const orderSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    receipt:{
        type: String,
       required: true
},
    phone: {
        type: String,
        required: true
    },
    pickupDate:{
        type: Date,
        required: true
    },
    dropoffDate:{
        type: Date,
        required: true
    },
    cloudinary_Id:{
        type:String,
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars"
    },
    approved:{
        type: Boolean,
        required: true,
        default: false
    }

});

const order = dbConnection.model('orders', orderSchema);

export default order;