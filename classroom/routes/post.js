const express = require("express");
const router= express.Router();



// Post Route
//Index
router.get("/",(req,res)=>{
    res.send("GET for posts");
})

//Show
router.get("/:id",(req,res)=>{
    res.send("GET for show post id");
})

//POST
router.post("/",(req,res)=>{
    res.send("POST for post id");
})

//DELETE
router.delete("/:id",(req,res)=>{
    res.send("DELETE for  post id");
})

module.exports=router;