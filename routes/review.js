const express = require('express');

//for req.params from app.js for /listing/:id/reviews
const router = express.Router({mergeParams:true});

const wrapAsync = require('../utils/wrapAsync.js');
const {validateReview, isLoggedIn, isReviewAuthor, isOwner} = require('../middleware.js');
const reviewController= require('../controllers/reviews.js');

//post review route
router.post("/",isLoggedIn ,validateReview,wrapAsync(reviewController.createReview));
//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;