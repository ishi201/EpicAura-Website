

const express = require("express");
const router= express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewauthor}=require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

  
//Reviews
//Post Rewiew  Route
router.post("/",validateReview, isLoggedIn,wrapAsync(reviewController.createReview));
    
    
    //Delete Review Route
    
    router.delete("/:reviewId",isLoggedIn,isReviewauthor,wrapAsync(reviewController.deleteReview));
    
    module.exports=router;