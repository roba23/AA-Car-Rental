//import orderDb from '../model/orderModel.js'
//import cloudinary from '../middleware/cloudinary.js'
//import sharp  from 'sharp'
//import streamifier  from 'streamifier'
import mongoose from 'mongoose'
import car from '../model/carModel.js'
import Chapa from '../model/chapaModel.js'

export default {
    async getUserHistory(req,res){
        let role = null;
            if(req.user){
                   role = req.user.role;
               
            }
        const data = await Chapa.find({userId: req.user._id}).populate('carId').sort({createdAt: "desc"}).lean();
        const count = await Chapa.countDocuments({userId: req.user._id});
         const user = req.user;
        res.render("Mybooking.ejs", {History: data, count: count, role: role, user});


    }
,
    async getOrderMessage (req,res){
        try{
         //   const targetOrder = req.params.id
            const order = await Chapa.find({ status: "pending" }).populate('carId').sort({createdAt: "desc"}).lean();
             const user = req.user;
            return res.render('order', {orders: order, role:"admin", user})  // orders.carId.Model
            
        } catch(err){
            console.log(err)
        }
    },

    
    async getOrderHistory (req,res){
        try{
            let role = null;
            if(req.user){
                   role = req.user.role;
               
            }
         
            const history = await Chapa.find( { $or:[ {status: "success"} , {status: "failed"} ] }).populate('carId').sort({createdAt: "desc"}).lean();
            const count = await Chapa.countDocuments( { $or:[ {status: "success"} , {status: "failed"} ] } )
             const user = req.user;
            return res.render('orderHistory', {History: history, count, role: role, user})  // orders.carId.Model
            
        } catch(err){
            console.log(err)
        }
    }, 

 /*   async makeOrder (req,res) {
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
           
            res.redirect("/orders");

        }
        catch(error){
            console.log("Error caught in orderCar catch block:");
            return res.status(500).json({
                success: false,
                message: "Failed to create car entry.",
                error: error.message
            });
        
        }
    },     */


    async acceptOrder(req,res) {
        try{
            const orderId = req.params.id
            const theOrder = await Chapa.findOneAndUpdate( 
                {_id: orderId},
                { $set:
                    { status: "success" }
                },
                {
                    sort:{_id: -1},
                    upsert: false
                } );
            console.log("the car id i found is:", theOrder.carId);
        
            await car.findByIdAndUpdate( theOrder.carId,
                { $set:
                    {status:"pending"}
                });
            return res.redirect('/')

        }catch(err){
            console.error(err)

        }
    },

    async declineOrder(req,res) {
        try{
            const orderId = req.params.id
            const theOrder = await Chapa.findOneAndUpdate( 
                {_id: orderId},
                { $set:
                    { status: "failed" }
                },
                {
                    sort:{_id: -1},
                    upsert: false
                } );
           
        
            await car.findByIdAndUpdate( theOrder.carId,
                { $set:
                    {status: "success"}
                });
            return res.redirect('/')

        }catch(err){
            console.error(err)

        }
    },

    async deleteOrders(req,res) {
        try{
            const itemId = req.params.id
            const deletedReceipt = await Chapa.findByIdAndDelete( itemId )

        //I am handling the messing record or assets(posted item)
            if( !deletedReceipt){
                console.log('No post found with that ID')
                return res.status(404).json({ message: 'Order not found'})
            }
            console.log('Successfully deleted post from database:', deletedReceipt )

        // Delete cloudinary assets individually
            if( deletedReceipt?.cloudinaryId ) {
                await cloudinary.uploader.destroy( deletedReceipt.cloudinaryId )
            }
            
            return res.redirect('/orders/history')

        } catch(err){
            console.error(err)
            return res.status(500).json({
                success: false,
                message: "Failed to delete order",
                error: err.message
            });
        }
    }
}