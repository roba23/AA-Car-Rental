
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
                      
        let role; 
        const checkDb = await user.find({});
        if(checkDb.length === 2){
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
            role: role,
            email: email, 
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