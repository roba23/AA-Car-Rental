import orderDb from '../model/orderSchema.js'
import cloudinary from '../middleware/cloudinary.js'
import sharp  from 'sharp'
import streamifier  from 'streamifier'

export default {

    async getOrderMessage (req,res){
        try{
         //   const targetOrder = req.params.id
            const order = await orderDb.find().populate('carId').sort({createdAt: "desc"}).lean()
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
            const result = await new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                { folder: 'Car-image' }, // Optional folder name
                (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                }
                );
                streamifier.createReadStream(resizedBuffer).pipe(stream);
            });

            const order = await orderDb.create({
                pickUp: req.body.pickUp,
                dropOFF: req.body.dropOff,
                Receipt: result.secure_url,
                cloudinaryId: result.public_id,
                renterName: req.body.name,
                Phone: req.body.phone,
                carId: req.body.carId
            })
// add this line to attach orderId to the this document to update the Status is change from order page.
            await carModel.findByIdAndUpdate( req.body.carId, {orderId : order._id})
            console.log(order)

            res.redirect('/orders')
        }catch(err){
            console.log(err)
        }
    },

     async acceptOrder(req,res) {
        try{
            const orderId = req.params.id
            await orderDb.findOneAndUpdate( 
                {_id: orderId},
                { $set:
                    { Status: true }
                },
                {
                    sort:{_id: -1},
                    upsert: false
                } )

            return res.redirect('/orders')

        }catch(err){
            console.error(err)

        }
    }
}