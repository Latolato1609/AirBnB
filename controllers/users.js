const User = require("../models/user");

module.exports.renderSignupForm = (req, res) =>{
    res.render("users/signup.ejs")
}

module.exports.signup = async(req, res)=>{
    try{
    let {username, email, password} = req.body.user;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome");
        res.redirect("/listings");
        }); 
    }
    catch(err){
       req.flash("error", err.message);
       res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req, res)=>{
    // console.log(req.user)
    const redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.redirectUrl;
    req.flash("success", "Welcome back :) ");
    res.redirect(redirectUrl);
}

module.exports.renderLogoutForm = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "logout successfully");
        res.redirect("/listings");
    });
};