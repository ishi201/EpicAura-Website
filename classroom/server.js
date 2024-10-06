const express = require("express");
const app= express();
const users= require("./routes/user.js");
const posts= require("./routes/post.js");
const session=require("express-session");

app.use(session({
    secret: 'mysupersecretstring', resave :false,saveUninitialized: true
  }));

  app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`you sent a request ${req.session.count}times`);
})

// app.get("/test",(req,res)=>{
//     res.send("test successful");
// })




// const cookieParser=require("cookie-parser");
// app.use(cookieParser("secretCode"));
// app.use(cookieParser());
// app.use("/users",users);
// app.use("/posts",posts);



// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","China",{signed : true});
//     res.send("signed cookie send");
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies",(req,res)=>{
// res.cookie("greet","hello");
// res.cookie("Madein","India");
// res.send("sent you some cookie!");
// })


// app.get("/greet",(req,res)=>{
//     let{name="anonymous"}=req.cookies;
//     console.dir(req.cookies);
//     res.send(`Hi , ${name}`);
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi , i m root");
// })

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})
