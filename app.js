const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("./models/user.js");

const cookieParser = require('cookie-parser');
app.use(cookieParser("secretcode"));

const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');


let Port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/chillcasa";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const sessionOption = {
    secret : "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
         expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
         maxAge : 7 * 24 * 60 * 60 * 1000,
         httpOnly : true
    }
}


main().then((res)=>{
    console.log("MongoDB connetion successful");
}).catch(err=>console.log(err));

async function main(){
    mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send("At Home");
})

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

//routers
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//page not found
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

//error handling middleware
app.use((err,req,res,next)=>{
   res.render("error",{err});
})

app.listen(Port,()=>{
    console.log("listening to the Port : 8080");
})