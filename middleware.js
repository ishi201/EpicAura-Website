module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must be logged to create listings!");
        return res.redirect("/login");
    }
    next();
}