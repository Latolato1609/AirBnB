const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const { deserializeUser } = require("passport");

const validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


//Review

//post review route
router.post("/", isLoggedIn , validateReview,  wrapAsync(reviewController.createReview));

//Delete review route

router.delete("/:reviewId" ,isLoggedIn, isReviewAuthor, reviewController.destroyReview)

module.exports = router;