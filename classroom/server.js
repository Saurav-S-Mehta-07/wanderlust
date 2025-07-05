const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");

app.use(
    session({
        secret:"mySuperSecretString",
        resave : false,
        saveUninitialized: true
        })
    );

app.get("/requestCount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
            req.session.count = 1;
        }
    res.send(`You set a request ${req.session.count} times`);
});

// app.get("/test",(req,res)=>{
//     res.send("text successful");
// });



app.listen(3000,()=>{
    console.log("server is listing to port 3000");
});