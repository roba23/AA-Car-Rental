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
<<<<<<< HEAD
},
=======
    },
>>>>>>> e5d9f9a (i added a new order controller file to you)
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
<<<<<<< HEAD
},
=======
    },
>>>>>>> e5d9f9a (i added a new order controller file to you)
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
<<<<<<< HEAD
  priceYearly: {
        type: Number,
        required: true
    },
    shifting: {
        type: String,
        required: true,
       

=======
    shifting: {
        type: String,
        required: true,
>>>>>>> e5d9f9a (i added a new order controller file to you)
    },
    milage:{
        type: Number,
        required: true
    },
<<<<<<< HEAD
    feautures:{
        type: Array,
        
    }
        

=======
    features:{
        type: Array,
        
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
        default: null,// B/c the car post is always posted before orders (order post exist. that is why we set null by default is the order is not exist.
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
        
>>>>>>> e5d9f9a (i added a new order controller file to you)
});

const car = dbConnection.model('cars', carSchema);

export default car;