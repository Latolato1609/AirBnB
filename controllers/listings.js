const Listing = require("../models/listing");


module.exports.index = async(req, res)=>{

    const allListing = await Listing.find({});
    // res.locals.success = req.flash("success");
    res.render("./listings/index.ejs", {allListing});
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/create.ejs", { listing: null });  // Pass listing as null or an empty object
};


module.exports.showListing = async(req, res)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id).populate( { path: "reviews", populate: { path: "author" } } ).populate("owner");

    if(!listing){
        req.flash("error", "Listing does not exist :( ");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/show.ejs", {listing, originalImageUrl});
}

module.exports.renderEditForm = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.updateListing = async(req, res)=>{

    if(!req.body.listing){
        throw new ExpressError(400, "Send Valid data for listing");
    }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file  !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success", "Listing Updated!!!!");
    res.redirect(`/listings/${id}`);

}

module.exports.destroyListing = async(req, res)=>{
    console.log(req.params);
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted :( ");
    console.log(deletedListing);
    res.redirect("/listings");
}

module.exports.postListing = async (req, res, next) => {
    try {
        // Log the entire request body to the console
        console.log("Request Body:", req.body);  // Logs the data sent from the form

        // Ensure a file is uploaded
        if (!req.file) {
            req.flash("error", "Please upload an image for your listing.");
            return res.redirect("/listings/new");
        }

        let url = req.file.path;
        let filename = req.file.filename;

        // Log the file info (useful for debugging)
        console.log("Uploaded file:", url, filename);

        // Ensure that the listing data is provided in the request body
        if (!req.body.listing || !req.body.listing.title || !req.body.listing.description) {
            req.flash("error", "Please fill in all required fields.");
            return res.redirect("/listings/new");
        }

        // Create the new listing
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id; // Assuming req.user is populated correctly
        newListing.image = { url, filename };

        // Save the new listing to the database
        await newListing.save();

        // Log the saved listing data (for debugging)
        console.log("New listing saved:", newListing);

        // Flash a success message and redirect to listings page
        req.flash("success", "New Listing Created :) ");
        res.redirect("/listings");
    } catch (err) {
        // Handle any errors that might occur during the process
        console.error("Error creating listing:", err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/listings/new");
    }
};
