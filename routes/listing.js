const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const multer  = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });

const listingController = require("../controllers/listings.js")


// const validateListing = (req, res, next)=>{
//     console.log(req.body);
//     let {error} = listingSchema.validate(req.body);

//     if(error){
//         throw new ExpressError(400, error);
//     }else{
//         next();
//     }
// }


router
   .route("/")
   .get(wrapAsync(async (req, res) => {
    try {
        let filter = {};  // Object to hold the filter conditions

        if (req.query.category) {
            filter.category = req.query.category;
        }

        // If a country query parameter is provided, filter listings by country
        if (req.query.country) {
            filter.country = new RegExp(req.query.country, 'i');  // Case-insensitive search for country
        }

        // Fetch listings from the database based on the filter
        const allListing = await Listing.find(filter);

        // Render the index page with the filtered listings
        res.render("listings/index", { allListing });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching listings.");
    }
  }))
   .post( upload.single('listing[image]'), wrapAsync(listingController.postListing)
   );


   //Create Route(new route)

router.get("/create",isLoggedIn, listingController.renderNewForm);


router
   .route("/:id")
   .put(isLoggedIn, isOwner,upload.single('listing[image]'),  wrapAsync(listingController.updateListing))
   .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))
   .get(wrapAsync(listingController.showListing)
   );


//Edit Route

router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)
);

module.exports = router;



//(Original unmodified piece of code)

// app.post("/listings", wrapAsync(async (req, res, next)=>{

//     // // let { title, location, country, image, price, description } = req.body;

//     // // let newListing = new Listing({
//     // //     title: title,
//     // //     location: location,
//     // //     country: country,
//     // //     image: image,
//     // //     price: price,
//     // //     description: description
//     // // });

//     // await newListing.save().then((res)=>{console.log(res)})
//     // .catch((err)=>{console.log(err)});

//     // res.redirect("/listings");

// })
// );

// router.get("/create",  (req, res)=>{
//     if(!req.isAuthenticated()){
//         req.flash("error", "you must be logged in first");
//         return res.redirect("/login");
//     }
//     res.render("listings/create.ejs")
// })


//Index Route

// router.get("/" ,wrapAsync(listingController.index)
// );


//Create(post)
// router.post("/" , validateListing, wrapAsync(listingController.postListing)
// );

// //Update route

// router.put("/:id", isLoggedIn, isOwner, wrapAsync(listingController.updateListing)
// );

// //Delete route

// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)
// );

// //Show route

// router.get("/:id", wrapAsync(listingController.showListing));