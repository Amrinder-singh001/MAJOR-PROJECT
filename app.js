const express = require("express");
const mongoose = require("mongoose");
const app = express();
let Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const CustomError = require("./utils/CustomError.js");
const { listingSchema } = require("./schema.js");


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



// function listingValidate is a middleware function that validates the request body against the listingSchema using Joi. If there is an error in validation, it throws a CustomError with a status code of 400 and the error message. If there is no error, it calls the next middleware function in the stack.
const listingValidate = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  console.log(error);

  if (error) {
    throw new CustomError(400, error.message);
}else{
    next();
}}


//Home route
app.get("/", (req, res) => {
  res.send("Hello, I'm Home")
})
 
// index route to show all lists.
//Jo bi fn async hei usko hm wrapAsync mei convert krenge.
app.get("/listings",
   listingValidate,
   wrapAsync(async (req, res) => {
  let allLists = await Listing.find({});
  res.render("listing/index.ejs", {allLists});
}))

// route for showing specfic list at /list/show/:id
app.get("/show/list/:id",
    listingValidate,
    wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listId = await Listing.findById(id);
    res.render("listing/show.ejs", { listId })
}))

//route for creating new list
app.get("/listing/new", (req, res) => {
   res.render("listing/new.ejs");
})

//route for accepting the post request after adding new list.
app.post("/listings", 
   listingValidate,
   wrapAsync(async (req, res, next) => {

    let {title ,description, image, price, location, country} = req.body;
     let addingNewList = new Listing({
        title : title,
        description : description,
        image : image,
        price : price,
        location : location,
        country : country
     })
     let newChat = await addingNewList.save()
     res.redirect("/listings");
}))


//route for showing only the edit form through an get request.
app.get("/listing/:id/edit", 
  listingValidate,
  wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listId = await Listing.findById(id);
   res.render("listing/edit.ejs", {listId});
}))

//route for actaully edit form through an put request.
app.put("/listing/:id", 
  listingValidate,
  wrapAsync(async (req, res) => {
     let { id } = req.params;
     let {title : newtitle, description : newdes, image : newimage, price : newprice, location : newloc, country : newcon} = req.body;
    let updatedlist = await Listing.findByIdAndUpdate(id, 
      {
        title : newtitle,
        description : newdes,
        image : newimage,
        price : newprice,
        location : newloc,
        country : newcon
      }, 
      {runValidators : true});
    res.redirect(`/show/list/${id}`);
}))

//Delete route using a delete request
app.delete("/listing/:id",
  wrapAsync (async(req, res) => {
  let {id} = req.params;
  let deletedId = await Listing.findByIdAndDelete(id);
  console.log(deletedId);
  res.redirect("/listings")
}))


// if no route is match or found then send a 404 error to the user through this route.
app.all('/{*any}' ,(req, res, next) => {
    next(new CustomError(404, "Page Not Found!!"));
})

//create a middleware for handling errors if they arrive.
app.use((err, req, res, next) => {
  let {statusCode = 500, message = "something went wrong"} = err;
  res.status(statusCode).render("./Errors/error.ejs", {err});
})
