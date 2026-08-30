import car from "../model/carModel.js";
import express from "express";
import cloudinary from "../middleware/cloudinary.js";
import streamifier from "streamifier";
import sharp from "sharp";
<<<<<<< HEAD
import order from "../model/orderModel.js";
=======
>>>>>>> e5d9f9a (i added a new order controller file to you)
const app = express();
app.use(express.static("public"));

export default {
<<<<<<< HEAD
    async getHomePage(req,res){
        try{
           let data = await car.find({});
           
            
            return res.render("homePage.ejs", {data: data, order: order});
            
            
            
=======

    async getHomePage(req,res){
        try{
           let data = await car.find({}).populate('orderId').sort({createdAt: 'desc'}).lean();

            return res.render("homePage.ejs", {data: data});

>>>>>>> e5d9f9a (i added a new order controller file to you)
        }
        catch(error){
             console.log("Error caught in addCar catch block:");
            return res.status(500).json({
                success: false,
<<<<<<< HEAD
                message: "Failed to create car entry.",
=======
                message: "Page Not_Found.",
>>>>>>> e5d9f9a (i added a new order controller file to you)
                error: error.message
            });
        }
        
    },
<<<<<<< HEAD
    async adminPage(req,res){
        res.render("adminPage.ejs");
    },
        async addCar(req,res){
=======

    async moreDetail(req,res){
        try{
            const id = req.params.id;
            console.log("id:", id);

            const data = await car.findById({_id: id});
            console.log("selected car :", data);

            res.render("carDetail.ejs", {data: data});
        }
        catch(error){
            console.error("getCar:", error);
        }
    },

    async adminPage(req,res){
        try{
            return res.render("adminPage.ejs");
        } catch(err){
            console.error(err)
            return res.status(404).json({
                success: false,
                message: 'Page Not_Found',
                error: err.message
            })
        }
       
    },

    async addCar(req,res){
>>>>>>> e5d9f9a (i added a new order controller file to you)
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
           
           
<<<<<<< HEAD
           const feauturesArray = req.body.feature;
           console.log(feauturesArray);
=======
           const featuresArray = req.body.feature;
           console.log(featuresArray);
>>>>>>> e5d9f9a (i added a new order controller file to you)
            
            
            // 3. Database operation will now run successfully
            const m = await car.create({
                name: req.body.name,
                imgUrl: result.secure_url,
                cloudinaryId: result.public_id,
                type: req.body.type,
                description: req.body.description,
                model: req.body.model,
                fuelType: req.body.fuelType,
                capacity: req.body.capacity,
                shifting: req.body.shifting,
                priceMonthly: req.body.priceMonthly,
                priceYearly: req.body.priceYearly,
                milage: req.body.milage,
<<<<<<< HEAD
                feautures: feauturesArray,
=======
                features: featuresArray,
>>>>>>> e5d9f9a (i added a new order controller file to you)
            });
            
            console.log("Database write successful:", m);
            return res.redirect("/");

        }
        catch(error){
            console.log("Error caught in addCar catch block:");
            return res.status(500).json({
                success: false,
                message: "Failed to create car entry.",
                error: error.message
            });
        }
    },
<<<<<<< HEAD

    async moreDetail(req,res){
        try{
            const id = req.params.id;
            console.log("id:", id);
            const data = await car.findById({_id: id});
            console.log("selected car :", data);
            res.render("cardetail.ejs", {data: data});
        }
        catch(error){
            console.error("getCar:", error);
        }
    },
    async orderCar(req,res){
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

            await order.create({
                fullname: req.body.fullname,
                phone: req.body.phone,
                receipt: result.secure_url,
                cloudinaryId: result.pulic_id,
                pickupDate: req.body.pickupDate,
                dropoffDate: req.body.dropoffDate,
                carId: req.body.carId,
                
            });
            res.redirect("/");

        }
        catch(error){
            console.log("Error caught in addCar catch block:");
            return res.status(500).json({
                success: false,
                message: "Failed to create car entry.",
                error: error.message
            });
        
        }
    },
=======
>>>>>>> e5d9f9a (i added a new order controller file to you)
    
};