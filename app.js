if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASTDB_URL;
const secret = process.env.SECRET || "fallbacksecret";

// ✅ MongoDB session store setup
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: secret,
    },
    touchAfter: 24 * 60 * 60, // once per day
});

store.on("error", (err) => {
    console.log("Error in MONGO SESSION STORE:", err);
});

// ✅ Session options
const sessionOptions = {
    store: store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// ✅ App config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionOptions));
app.use(flash());

// ✅ Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ DB connection
async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ DB Connection Error:", err);
    }
}
main();

// ✅ Flash & current user middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ✅ Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ✅ 404 handler
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// ✅ Error handler
app.use((err, req, res, next) => {
    console.error(err);
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { message });
});

// ✅ Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});








// if(process.env.NODE_ENV != "production"){
//     require('dotenv').config()
// }
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const exp = require("constants");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");

// const session = require("express-session");
// const MongoStore = require('connect-mongo');

// const ExpressError = require("./utils/ExpressError.js");

// const flash = require("connect-flash");
// const User = require("./models/user.js");

// const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");

// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");

// const dbUrl = process.env.ATLASTDB_URL;

// // const store = MongoStore.create({
// //     mongoUrl: dbUrl,
// //     crypto:{
// //         secret: process.env.SECRET
// //     },
// //     touchAfter: 24 * 60 * 6
// // })

// const store = MongoStore.create({
//     mongoUrl: dbUrl,  // use full string, no replace
//     dbName: "ClusterAirBnB",             // explicitly specify the database name
//     crypto:{
//         secret: process.env.SECRET
//     },
//     touchAfter: 24 * 60 * 6
// });


// store.on("error", (err)=>{
//     console.log("Error in MONGO SESSION STORE", err)
// })

// const sessionOptions = {
//     store: store,
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie:{
//         expires : Date.now() +  7 * 24 * 60 * 60 * 1000,
//         maxAge :  7 * 24 * 60 * 60 * 1000, 
//         httpOnly: true,
//     }
// };



// app.use(methodOverride("_method")); 

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "public")));

// app.use(session(sessionOptions));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// const MONGO_URL = 'mongodb://127.0.0.1:27017/Wanderlust'

// main()
//     .then(() => console.log("Connected to db"))
//     .catch(err => console.log(err));

// // async function main() {
// //     await mongoose.connect(MONGO_URL);

// // }

// // Connection With DBURL

// // async function main() {
// //     await mongoose.connect(dbUrl);
// // }


// async function main() {
//     try {
//         await mongoose.connect(dbUrl);
//         // console.log("Connected to DB");
//     } catch (err) {
//         console.log("DB Connection Error:", err);
//     }
// }


// app.use((req, res, next)=>{
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     res.locals.currUser = req.user;
//     next();
// });



// app.use("/listings", listingRouter) // express router
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);


// // app.get("/", (req, res) => {
// //     res.send("Route Working");
// // });

// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page not Found!!!"));
// });


// app.use((err, req, res, next)=>{
//     console.log(err);
//     let {status = 500, message = "Something went wrong" } = err;
//     res.status(status).render("error.ejs",{message});
// })


// app.listen(8080, () => {
//     console.log("Server is running");
// })

