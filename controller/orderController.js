import orderDb from '../model/orderModel.js'
import cloudinary from '../middleware/cloudinary.js'
import sharp  from 'sharp'
import streamifier  from 'streamifier'
import mongoose from 'mongoose'
import car from '../model/carModel.js'

export default {

    async getOrderMessage (req,res){
        try{
         //   const targetOrder = req.params.id
            const order = await orderDb.find().populate('carId').sort({createdAt: "desc"}).lean();
            
            return res.render('order', {orders: order})  // orders.carId.Model
            
        } catch(err){
            console.log(err)
        }
    },

    async makeOrder (req,res) {
       try{
            
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            
            // 1. Compress the image buffer
            const resizedBuffer = await sharp(req.file.buffer)
                .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: 80 }) 
                .toBuffer();
            
            // 2. Upload the compressed buffer directly to Cloudinary
            const result =  await  new Promise((resolve, reject) => {
                let stream =  cloudinary.uploader.upload_stream(
                    { folder: 'car_images' },
                    (error, result) => {
                        // FIX: Added 'return' keywords back to guarantee Promise completion
                        if (result)  resolve(result);
                        else  reject(error);
                    }
                );
                streamifier.createReadStream(resizedBuffer).pipe(stream);

            });
            console.log("data in makorder:", req.body);
           const data =  await orderDb.create({
                fullname: req.body.name,
                phone: req.body.phone,
                receipt: result.secure_url,
                cloudinaryId: result.public_id,
                pickUp: req.body.pickUp,
                dropOff: req.body.dropOff,
                carId: new mongoose.Types.ObjectId(req.body.carId),
                
                
            });
            console.log("the created order is:", data);
           
            res.redirect("/");

        }
        catch(error){
            console.log("Error caught in orderCar catch block:");
            return res.status(500).json({
                success: false,
                message: "Failed to create car entry.",
                error: error.message
            });
        
        }
    },

     async acceptOrder(req,res) {
        try{
            const orderId = req.params.id
            const theOrder = await orderDb.findOneAndUpdate( 
                {_id: orderId},
                { $set:
                    { status: true }
                },
                {
                    sort:{_id: -1},
                    upsert: false
                } );
            console.log("the car id i found is:", theOrder.carId);
        
            await car.findByIdAndUpdate( theOrder.carId,
                { $set:
                    {status:false}
                });
            return res.redirect('/orders')

        }catch(err){
            console.error(err)

        }
    }
}