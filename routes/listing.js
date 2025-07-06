const express = require("express");
const router = express.Router();
const wrapAsync =  require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");



let validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


//index route
router.get("/", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}));

//new route
router.get("/new",(req,res,next)=>{
    res.render("listings/new.ejs");
});

//show route
router.get("/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
        // return next(new ExpressError(404, "Listing not found!"));
    }
    res.render("listings/show", { listing }); 
}));


//create route
router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
}));


//edit route
router.get("/:id/edit", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

//update route 
router.put("/:id",validateListing, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});

    req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", wrapAsync(async(req,res)=>{
   let {id} = req.params;
   let deletedListing =  await Listing.findByIdAndDelete(id);
   req.flash("success","Listing Deleted");
   res.redirect(`/listings`);
}));


module.exports = router;