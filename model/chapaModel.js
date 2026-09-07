import mongoose from "mongoose";
import dbConnection from "../config/config.js";


const ChapaSchema = new mongoose.Schema({
    pickUp:{
        type: Date,
        required: true
    },
    dropOff:{
        type: Date,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        require: true
    },
    currency:{
        type: String,
        default: "ETB",
        required: true
    },
    tx_ref: {
        type: String,
        require: true,
        unique: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    status: {
        type: String,
        enum: [ 'pending', 'success', 'failed'],
        default: 'pending'
    },
 /*   payment_method: {
        type: string
    },
    chapa_charge: {
        type: Number
    },   
    status: {
        type: String,
        enum: [ 'pending', 'success', 'failed'],
        default: 'pending'
    },  */
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true})


const order = dbConnection.model('Chapa', ChapaSchema);

export default order;