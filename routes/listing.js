const express = require("express");
const router = express.Router();
const wrapAsync =  require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedin, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');

const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingController.index)) 
// .post(isLoggedin,upload.single("listing[image]"), validateListing,wrapAsync(listingController.createListing));
.post(upload.single("listing[image]"), (req, res) => {
   res.send(req.file);
});

//new route
router.get("/new",isLoggedin,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedin,isOwner,validateListing,wrapAsync(listingController.updateListing)) 
.delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing));

router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;