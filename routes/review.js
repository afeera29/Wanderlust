const express = require("express");
const router= express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review =require ("../models/review.js");
const listings=require("../routes/listing.js");
const reviews=require("../routes/review.js");
const Listing = require("../models/listing.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const {validateReview, isLoggedIn,isReviewAuthor}= require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//reviews
//POST route
router.post("/",validateReview,isLoggedIn, wrapAsync(reviewController.createReview));
//delete route for review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    wrapAsync (reviewController.destroyReview)
);
module.exports=router;
// so like in listing.js the routes whihc are same can be combined together for code 
//modularity and can be written in a comoact form for this file also 