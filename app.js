const express = require("express");
const app = express();
const mongoose = require("mongoose");
let Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const CustomError = require("./utils/CustomError.js");
const { listingSchema } = require("./schema.js");
const Review = require("./models/reviews.js");
const { reviewSchema } = require("./schema.js");
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const sessions = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const UserRouter = require("./routes/user.js");
// const { default: passportLocalMongoose } = require("passport-local-mongoose");


const sessionOptions = {
  secret : "mysuperstring",
  resave : false,
  saveUninitialized : true,
  httpOnly : true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000
  }
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(sessions(sessionOptions));
app.use(flash());
app.engine("ejs", ejsmate);

//for authentication process
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let port = 8080;
app.listen(port, ()=>{
    console.log(`Server is started at ${port}`);
})

//connect to database through mongoose.
main()
  .then(() => {
    console.log("Connected To DB");
  }) 
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
  "mongodb+srv://amxindersingh_db_user:bsjMTpBpp5loIzZK@cluster0.rdlt2k9.mongodb.net/wanderlust?appName=Cluster"
  );
  console.log("Connected Database:", mongoose.connection.name);

  const admin = mongoose.connection.db.admin();
  const dbsList = await admin.listDatabases();

  console.log("All Databases in Atlas Cluster:");
  dbsList.databases.forEach(db => {
    console.log(` - ${db.name}`);
  });
}

app.use((req, res, next) => {
   res.locals.successMsg = req.flash("success");
   res.locals.errorMsg = req.flash("error");
   res.locals.currUser = req.user;
   next();
})

// simple rouute for user like an demo
app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email : "abcd@gmail.com",
    username : "Amrinder singh"
  })
  let registedUser = await User.register(fakeUser, "Howareyoumerijaan");
  res.send(registedUser);
})
// app.use is a method
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", UserRouter);

app.all('/{*any}' ,(req, res, next) => {
    next(new CustomError(404, "Page Not Found!!"));
})


//create a middleware for handling errors if they arrive.
app.use((err, req, res, next) => {
  let {statusCode = 500, message = "something went wrong"} = err;
  res.status(statusCode).render("./Errors/error.ejs", {err});
})
