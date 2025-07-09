const express = require("express");
const router = express.Router();
const wrapAsync =  require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedin, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

//index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new",isLoggedin,listingController.renderNewForm);

//show route
router.get("/:id", wrapAsync(listingController.showListing));


//create route
router.post("/",isLoggedin,validateListing,wrapAsync(listingController.createListing));


//edit route
router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(listingController.renderEditForm));

//update route 
router.put("/:id",isLoggedin,isOwner, validateListing, wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedin,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;