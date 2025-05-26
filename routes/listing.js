const express = require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing =require ("../models/listing.js");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");
const multer = require('multer');
const listingController = require("../controllers/listings.js");
const {storage}= require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
// .post(isLoggedIn,validateListing,
//     wrapAsync (listingController.createListing));

.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing)
);


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get (wrapAsync (listingController.showListing))
.put(
    isLoggedIn,isOwner,upload.single("listing[image]"), validateListing,
    wrapAsync (listingController.updateListing)
)
.delete(isLoggedIn,isOwner,wrapAsync (listingController.destroyListing))


//here new route was created after the show route but we have placed
//it like this because the listing/new....the new in this is being taken as the id in /lsiting/:id so to avoid that 

// Show Route
router
//Create Route 

// Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,
    wrapAsync (listingController.renderEditForm)
);

//Update Route

//Delete Route


module.exports = router;