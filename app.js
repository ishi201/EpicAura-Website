const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");
const methodoverride=require("method-override");
//const { redirect } = require("statuses");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
app.use(methodoverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/Wonderlust";


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.get("/health",(req,res)=>{
//     res.send("API health is ok !!");
// })
app.get("/",(req,res)=>{
    res.send("i m root");
})

 // Index Route

 app.get("/listings",wrapAsync(async(req,res)=>{
   const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings})
    }));

//New route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
 });
 


// Show Route
app.get ("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
   const  listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
}))

//Create Route

app.post("/listings",wrapAsync (async(req,res,next)=>{
    if(!req.body.listing){
      throw new ExpressError(404,"Send valid data for listing");
    }
        const newListing = new Listing (req.body.listing)  //instance create kr rhe h
        await newListing.save();
        res.redirect("/listings");
    
   
//let {title,description,image,price,country, location}=req.body;
//let listing= req.body.listing;

}))

//Edit Route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const  listing = await Listing.findById(id);
     res.render("./listings/edit.ejs",{listing});
}))

//Update Route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
  if(!req.body.listing){
    throw new ExpressError(404,"Send valid data for listing");
  }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});//js ki obj hai jiske ander sare parameters h recontruct krk unn parameter ko individual value me convert krenge jisko hum nayi updated value me pass krenge
    res.redirect(`/listings/${id}`);
}))

//DELETE ROUTE
app.delete("/listings/:id",wrapAsync( async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}))


// app.get("/testListing",async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",

//     country: "India",
//   })

//    await sampleListing.save().then((res)=>{
//     console.log("connected to mongo shell");
//    });
  
//   console.log("data was saved");
//   res.send("successful testing");
// });
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"));
})


app.use((err,req,res,next)=>{
  let{statusCode=500,message="Something went wrong!!"}=err;
  res.status(statusCode).render("Error.ejs",{message});
//res.status(statusCode).send(message);
})

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});