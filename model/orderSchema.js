import  mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    pickUp:{
        type: Date,
        required: true
    },
    dropOFF:{
        type: Date,
        required: true
    },
    Receipt:{
        type: String,
        required: true
    },
    cloudinaryId:{
        type: String,
        required: true
    },
    renterName:{
        type: String,
        required: true
    },
    Phone:{
        type: String,
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars",
        required: true
    },
    Status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const order = mongoose.model( 'Orders', orderSchema)
export default order;