const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users.js");

router
   .route("/signup")
   .get( userController.renderSignupForm )
   .post( wrapAsync(userController.signup )
   );

router
   .route("/login")
   .get( userController.renderLoginForm )
   .post( saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login );



// logout

router.get("/logout", userController.renderLogoutForm);
module.exports = router;


// //Signup || Register

// router.get("/signup",userController.renderSignupForm );

// router.post("/signup", wrapAsync(userController.signup));

// // Login

// router.get("/login", userController.renderLoginForm);


// router.post("/login", saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)


