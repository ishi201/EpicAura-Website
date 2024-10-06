const express = require("express");
const router= express.Router();
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");

const {listingSchema}=require("../schema.js");


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
  
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(404,errMsg);
    }else{
      next();
    }
  }
 // Index Route

 router.get("/",wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({});
     res.render("listings/index.ejs",{allListings})
     }));
 
 //New route
 router.get("/new",(req,res)=>{
     res.render("./listings/new.ejs");
  });
  
 
 
 // Show Route
 router.get ("/:id",wrapAsync(async(req,res)=>{
     let {id}=req.params;
    const  listing = await Listing.findById(id).populate("reviews");
     res.render("./listings/show.ejs",{listing});
 }))

 
//Create Route

router.post("/",validateListing,wrapAsync (async(req,res,next)=>{

    const newListing = new Listing (req.body.listing)  //instance create kr rhe h
    await newListing.save();
    res.redirect("/listings");


//let {title,description,image,price,country, location}=req.body;
//let listing= req.body.listing;

}))

//Edit Route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
let {id}=req.params;
const  listing = await Listing.findById(id);
 res.render("./listings/edit.ejs",{listing});
}))

//Update Route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{

    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});//js ki obj hai jiske ander sare parameters h recontruct krk unn parameter ko individual value me convert krenge jisko hum nayi updated value me pass krenge
    res.redirect(`/listings/${id}`);
}))

//DELETE ROUTE
router.delete("/:id",wrapAsync( async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}))

module.exports=router;