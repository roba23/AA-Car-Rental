import { Strategy as LocalStrategy } from 'passport-local';
import 'dotenv/config';
import bcrypt from "bcrypt";
import user  from "../model/userModel.js";
 async function configurePassport(passport){
    
   passport.use(
    new LocalStrategy({usernameField: 'email'},async(username, password, done)=>{
        try{
            const foundUser = await user.findOne({email: username});
            if(!foundUser){
                return done(null, false, {message: 'The email is not registered'});
            }
        
            let isMatch = await bcrypt.compare(password, foundUser.password);
            if(!isMatch){
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null,foundUser);
        }
        catch(error){
            console.error("error is:", error);
        }
    })
   );

   passport.serializeUser((user,done)=>{
    done(null,user._id);
   })

   passport.deserializeUser(async function(id, done){
    try{
        const foundUser = await user.findById(id);
        done(null, foundUser);
    }
    catch(err){
        done(err,null);
    }
   });
};
export default configurePassport;


