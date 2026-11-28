const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const CustomError = require("../utils/CustomError.js");
const { listingSchema } = require("../schema.js");
const { reviewSchema } = require("../schema.js");
let Listing = require("../models/listing.js");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const { isLoggedIn } = require("../middleware.js");


// function listingValidate is a middleware function that validates the request body against the listingSchema using Joi. If there is an error in validation, it throws a CustomError with a status code of 400 and the error message. If there is no error, it calls the next middleware function in the stack.
const listingValidate = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    console.log(error);
  
    if (error) {
      throw new CustomError(400, error.message);
  }else{
      next();
  }}
  

// index route to show all lists.(Home route)
//Jo bi fn async hei usko hm wrapAsync mei convert krenge.
router.get("/",
  listingValidate,
  wrapAsync(async (req, res) => {
 let allLists = await Listing.find({});
 res.render("listing/index.ejs", {allLists});
}))

//route for creating new list
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listing/new.ejs");
 })
 
 // route for showing specfic list at /list/show/:id
router.get("/:id",
  listingValidate,
  isLoggedIn,
  wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listId = await Listing.findById(id).populate("reviews");
  if(!listId){
    req.flash("error", "For which listing you requested deos not existed!")
    return res.redirect("/listings");
  }
  res.render("listing/show.ejs", { listId })
}))

 
 // 2 route for accepting the post request before adding new list.
 router.post("/", 
    listingValidate,
    isLoggedIn,
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
      req.flash("success", "New Listing Added!");
      res.redirect("/listings");
 }))

//route for showing only the edit form through an get request.
router.get("/:id/edit", 
    listingValidate,
    isLoggedIn,
    wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listId = await Listing.findById(id);
     res.render("listing/edit.ejs", {listId});
  }))
  //route for actaully edit form through an put request.
  router.put("/:id", 
    listingValidate,
    isLoggedIn,
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
        req.flash("success", "Listing Updated Sucessfully!");
      res.redirect(`/listings/${id}`);
  }))

  
  //Delete route using a delete request
  router.delete("/:id",
    isLoggedIn,
    wrapAsync (async(req, res) => {
    let {id} = req.params;
    let deletedId = await Listing.findByIdAndDelete(id);
    console.log(deletedId);
    req.flash("success", "Lisitng Deleted Sucessfully!");
    res.redirect("/listings")
  }))

  module.exports = router;