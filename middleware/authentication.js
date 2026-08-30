
export async function isloggedin(req,res,next) {
  
        if(req.isAuthenticated()){
          
            return next();
        }

    
            return res.redirect("/user/login");
        
    
}

export async function isAdmin(req,res,next){
    if(req.user.role === 'admin'){
        return next();
    }
    return res.redirect("/");
}