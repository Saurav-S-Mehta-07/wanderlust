const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOption = {
        secret:"mySuperSecretString",
        resave : false,
        saveUninitialized: true
};

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let { name = "User" } = req.query;
    req.session.name = name;
    if(name == "User"){
        req.flash("error","user not registered");
    }
    else{
       req.flash("success","user registered successfuly!");
    }
    res.redirect('/hello');
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name});
});

// app.get("/requestCount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//             req.session.count = 1;
//         }
//     res.send(`You set a request ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//     res.send("text successful");
// });



app.listen(3000,()=>{
    console.log("server is listing to port 3000");
});