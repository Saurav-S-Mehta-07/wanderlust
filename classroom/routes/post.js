const express = require("express");
const router = express.Router();
// post
//index
router.get("/",(req,res)=>{
    res.send("get for posts");
});

//show
router.get("/:id",(req,res)=>{
    res.send("get for show post id");
});

//post route
router.post("/",(req,res)=>{
    res.send("Post for posts");
});

//delete route
router.delete("/:id",(req,res)=>{
    res.send("delete for posts id");
});

module.exports = router;