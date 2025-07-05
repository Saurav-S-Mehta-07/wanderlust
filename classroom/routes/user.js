const express = require("express");
const router = express.Router();




//index- users
router.get("/",(req,res)=>{
    res.send("get for users");
});

//show-users
router.get("/:id",(req,res)=>{
    res.send("get for show user id");
});

//post route
router.post("/",(req,res)=>{
    res.send("Post for users");
});

//delete route
router.delete("/:id",(req,res)=>{
    res.send("delete for user id");
});

module.exports = router;