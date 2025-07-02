const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync =  require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");


main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

let validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});

//index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}));

//new route
app.get("/listings/new",(req,res,next)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        return next(new ExpressError(404, "Listing not found!"));
    }
    res.render("listings/show", { listing }); 
}));


//create route
app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


//edit route
app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route 
app.put("/listings/:id",validateListing, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id", wrapAsync(async(req,res)=>{
   let {id} = req.params;
   let deletedListing =  await Listing.findByIdAndDelete(id);
   res.redirect(`/listings`);
}));


app.all("*",(req,res,next)=>{
     next(new ExpressError(404,"Page Not Found!"));
});


app.use((err,req,res,next)=>{
    let {statusCode=500 , message="Something worng"} = err;
    res.status(statusCode).render("error.ejs",{err});
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});