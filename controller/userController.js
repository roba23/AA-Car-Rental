
import user from "../model/userModel.js";
import cloudinary from "../middleware/cloudinary.js";
import streamifier from "streamifier";
import sharp from "sharp";
import bcrypt from "bcrypt";
import passport from "passport";

export default  {
    async getLogin(req,res){
        if(req.query.error){
            return res.render("login.ejs", {error: req.query.error});
        }
      
        return res.render("login.ejs"); 

    },
    async postLogin(req,res,next){
        passport.authenticate('local', (err, user, info)=>{
            if(err) return next(err);
            if(!user){
                

                const message = encodeURIComponent(info.message);
                console.log("message:", message);
                return res.redirect(`/user/login/?error=${message}`);
            }
            req.login(user, (err)=>{
                if(err) return next(err);
                return res.redirect("/");
            });
        })(req,res,next);
        console.log(req.body);
        

    },
    async getRegister(req,res){
       
        res.render("register.ejs");
    },
    async postRegister(req,res){
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
        let role; 
        const checkDb = await user.find({});
        if(checkDb.length === 0){
            role = "admin";
        }
        else{
            console.log("users Db:", checkDb);
            role = "user";
        }

        
        const {fullname,email,age, phone,birthDate,password } = req.body;
        let hashed = await bcrypt.hash(password, 10);
        
        const newUser = await user.create({
            fullname: fullname,
            age: age,
            imgUrl: result.secure_url,
            cloudinaryId: result.public_id,
            role: role,
            phone: phone,
            email: email,
            birthDate: birthDate,
            password: hashed
        });
        
        req.login(newUser, (err)=>{
            if(err){
                console.log("new session creation after registring new user failed ", error);
                return next(err);
            }
            return res.redirect("/");
        })

    
        }
        catch(error){
            console.error("postRegister", error);
        }
        

        

    }

}