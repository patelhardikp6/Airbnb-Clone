
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

//New & Create Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

// Index Route
// router.get("/",  wrapAsync(listingController.index));
//router.post("/" ,isLoggedIn,validateListing, wrapAsync(listingController.createListing));


//Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing)
);

//Update Route
//router.put("/:id", isLoggedIn,isOwner,validateListing,wrapAsync(listingController.upadateListing));
//Delete Route
//router.delete("/:id" ,isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));
//Show Route
//router.get("/:id", wrapAsync(listingController.showListing));

module.exports = router;