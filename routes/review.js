const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync =  require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedin, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//post reviews route
router.post("/", isLoggedin,validateReview,wrapAsync(reviewController.createReview));

//Delete review route
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;
