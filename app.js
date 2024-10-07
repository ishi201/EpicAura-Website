const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session=require("express-session");
const path=require("path");
const methodoverride=require("method-override");
//const { redirect } = require("statuses");
const ejsMate=require("ejs-mate");

const ExpressError=require("./utils/ExpressError.js");

const listings= require("./routes/listing.js");

const reviews=require("./routes/review.js");
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

const sessionOptions ={
  secret:"mysupersecretcode",
  resave : false,
  saveUninitialized:true
}
app.use(session(sessionOptions));

app.get("/",(req,res)=>{
    res.send("i m root");
})


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


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