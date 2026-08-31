import car from "../model/carModel.js";
import bodyParser from "body-parser";
import express from "express";
import cloudinary from "../middleware/cloudinary.js";
import streamifier from "streamifier";
import sharp from "sharp";
import mongoose from "mongoose";
import order from "../model/orderModel.js";
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
export default {

    async getHomePage(req,res){
        try{
           
            let data;
            let role = 'user';
            if(req.user){
                if(req.user.role === 'admin'){
                    role = 'admin';
                }
               
            }
            let {filter} = req.query;
            if(Array.isArray(filter)){
          
                data = await car.find({priceMonthly:{$lte: filter[1], $gte: filter[0]}}).sort({createdAt: "desc"}).lean();
                return res.render("homePage.ejs", {data: data, role: role});
             
            }
            if(typeof filter === 'string'){
                console.log("filter is:", filter);
                data = await car.find({type: filter}).populate('orderId').sort({createdAt: "desc"}).lean();
                return res.render("homepage.ejs", {data: data, selectedFilter: filter, role: role});

            }

           
            
            data = await car.find({}).sort({createdAt: "desc"}).lean();;
            
            return res.render("homePage.ejs", {data: data, selectedFilter: '', role: role})
           
           
            
            
        }
        catch(error){
             console.log("Error caught in getHomepage catch block:", error);
            return res.status(500).json({
                success: false,
                message: "failed to render gethomepage.",
                error: error.message
            });
        }

    },
   
    async moreDetail(req,res){
        try{
            const id = req.params.id;
            console.log("id:", id);

            const data = await car.findById({_id: id}).populate('orderId').lean();
            console.log("selected car :", data);

            res.render("carDetail.ejs", {data: data});
        }
        catch(error){
            console.error("getCar:", error);
        }
    },

    async carAddForm(req,res){
        try{
            return res.render("addCar.ejs");
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
           
           
           const featuresArray = req.body.feature;
           console.log(featuresArray);
           console.log("data is:", req.body);
            
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
                //priceYearly: req.body.priceYearly,
                milage: req.body.milage,
                features: featuresArray,
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
            const data = await car.findById({_id: id});
            res.render("cardetail.ejs", {data: data});
        }
        catch(error){
            console.error("getCar:", error);
        }
    },
    async search(req,res){
        
        let {search} = req.body;
        
        let data = await car.find({name: {$regex: req.body.search, $options: "i"}});
        res.render("homePage.ejs", {data: data, selectedFilter: ''});
    }
    
};
