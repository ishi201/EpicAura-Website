const express = require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing}=require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});  //multer files ko cloudinary ki storage me save krwayega

//index and create route added
router.route("/")
.get(wrapAsync(listingController.index) )
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync (listingController.createListing));

 //New route
 router.get("/new",isLoggedIn,listingController.renderNewForm);
  

//show,update,delete route added
router.route("/:id")
.get (wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))



//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))


module.exports=router;


//before use router.route---------------------------------------------------------------------------

//  // Index Route
// router.get("/",wrapAsync(listingController.index) );
 

 
 
//  // Show Route
//  router.get ("/:id",wrapAsync(listingController.showListing)
// );

 
// //Create Route

// router.post("/",validateListing,isLoggedIn,wrapAsync (listingController.createListing)
// );

// //Update Route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing)
// )

// //DELETE ROUTE
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing)
// )

