const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require("../utils/ExpressError.js");
const { ListingSchema }  = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require('../middleware.js');

//joi validation
const validateListing = (req,res,next)=>{
  let {error} = ListingSchema.validate(req.body);
  if(error){
    let errorMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errorMsg);
  }
  else{
    next();
  }
}

//index route
router.get("/",wrapAsync(async (req,res)=>{
   const allListings = await Listing.find();
   res.render("listings/index.ejs",{allListings});
}));

//create route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
})

router.post("/",isLoggedIn, validateListing, wrapAsync(async(req,res)=>{
   const newListing = new Listing(req.body.listing); 
   await newListing.save();
   req.flash("success","New Listing Created");
   res.redirect("/listings");
}));

//update route
router.put("/:id",isLoggedIn, validateListing, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing},{runValidators:true});
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}));

//show route
router.get("/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show",{listing});
}));

router.get("/:id/edit", isLoggedIn, wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

//delete route
router.delete("/:id", isLoggedIn, wrapAsync(async(req,res)=>{
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success","Listing deleted successfully");
   res.redirect("/listings");
}));

module.exports = router; //router object