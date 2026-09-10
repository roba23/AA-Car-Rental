
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

    async logout(req, res, next) {
        // 1. Check user role BEFORE logging out / destroying session
            const userRole = req.user ? req.user.role : null;

        // 2. Log out the user from Passport
            req.logout(function (err) {
                if (err) { return next(err); }
                console.log('User has logged out.');

                // 3. Destroy session
                req.session.destroy((err) => {
                    if (err) {
                        console.log('Error : Failed to destroy the session during logout.', err);
                    }

              // 4. Clear cookie
                      res.clearCookie('connect.sid');

              // 5. Redirect the user to the the login page
                      return res.redirect('/user/login');
                });
            });
    },

    async getRegister(req,res){
       
        res.render("register.ejs");
    },
    async postRegister(req,res){
        try{
                      
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