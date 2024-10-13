module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error","you must be logged to create listings!");
        return res.redirect("/login");
    }
    next();
}