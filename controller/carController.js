import car from "../model/carModel.js";
import express from "express";
import cloudinary from "../middleware/cloudinary.js";
import streamifier from "streamifier";
import sharp from "sharp";
import order from "../model/orderModel.js";
const app = express();
app.use(express.static("public"));
let data;
export default {
    async getHomePage(req,res){
        try{
             let {filter} = req.query;
            if(Array.isArray(filter)){
                 console.log("fitler is:", filter);
          
                data = await car.find({priceMonthly:{$lte: filter[1], $gte: filter[0]}});
                return res.render("homePage.ejs", {data: data});
            
            }
            if(typeof filter === 'string'){
                console.log("filter is:", filter);
                data = await car.find({type: filter});
                return res.render("homepage.ejs", {data: data});

            }

           
            
            data = await car.find({});
            return res.render("homePage.ejs", {data: data, order: order});
          
            data = await car.find({});
            if(!data){
                data = await car.find({});
                res.render("homePage.ejs", {data: data});
            }
            else{
                console.log("already fetched no need to refetch");
                res.render("homePage.ejs", {data: data});
            }
            
            
            
        }
        catch(error){
             console.log("Error caught in getHomepage catch block:");
            return res.status(500).json({
                success: false,
                message: "failed to render gethomepage.",
                error: error.message
            });
        }
        
    },
    async adminPage(req,res){
        res.render("adminPage.ejs");
    },
        async addCar(req,res){
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
           
           
           const feauturesArray = req.body.feature;
           console.log(feauturesArray);
            
            
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
                feautures: feauturesArray,
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
    
};