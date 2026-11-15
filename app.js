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
const listings = require("./routes/listings.js");
const reviews = require("./routes/reviews.js");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);

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

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all('/{*any}' ,(req, res, next) => {
    next(new CustomError(404, "Page Not Found!!"));
})


//create a middleware for handling errors if they arrive.
app.use((err, req, res, next) => {
  let {statusCode = 500, message = "something went wrong"} = err;
  res.status(statusCode).render("./Errors/error.ejs", {err});
})
