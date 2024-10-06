const express = require("express");
const app= express();
const users= require("./routes/user.js");
const posts= require("./routes/post.js");

app.use("/users",users);
app.use("/posts",posts);


app.get("/getcookies",(req,res)=>{
res.cookie("greet","hello");
res.cookie("Madein","India");
res.send("sent you some cookie!");
})

app.get("/",(req,res)=>{
    res.send("Hi , i m root");
})

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})