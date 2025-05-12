if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const exp = require("constants");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const MongoStore = require('connect-mongo');

const ExpressError = require("./utils/ExpressError.js");

const flash = require("connect-flash");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const dbUrl = process.env.ATLASTDB_URL;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET
    },
    touchAfter: 24 * 60 * 60
})

store.on("error", ()=>{
    console.log("Error in MONGO SESSION STORE", err)
})

const sessionOptions = {
    // store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expire : Date.now() +  7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
    }
};



app.use(methodOverride("_method")); 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const MONGO_URL = 'mongodb://127.0.0.1:27017/Wanderlust'

main()
    .then(() => console.log("connected to db"))
    .catch(err => console.log(err));

// async function main() {
//     await mongoose.connect(MONGO_URL);

// }

// Connection With DBURL

async function main() {
    await mongoose.connect(dbUrl);
}

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// app.get("/demouser", async(req, res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student",
//     })

//     let registeredUser = await User.register(fakeUser, "password");
//     res.send(registeredUser);
// })

app.use("/listings", listingRouter) // express router
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// app.get("/", (req, res) => {
//     res.send("Route Working");
// });

app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not Found!!!"));
})

app.use((err, req, res, next)=>{
    console.log(err);
    let {status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs",{message});
})


app.listen(8080, () => {
    console.log("Server is running");
})

