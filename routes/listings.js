const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const CustomError = require("../utils/CustomError.js");
const { listingSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const { reviewSchema } = require("../schema.js");
let Listing = require("../models/listing.js");
const mongoose = require("mongoose");



const listingValidate = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    console.log(error);
  
    if (error) {
      throw new CustomError(400, error.message);
  }else{
      next();
  }}
    

const reviewValidate = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    console.log(error);
  
    if (error) {
      throw new CustomError(400, error.message);
  }else{
      next();
  }}
  
  

//route for creating new list
router.get("/new", (req, res) => {
    res.render("listing/new.ejs");
 })
 
 
 // 2 route for accepting the post request after adding new list.
 router.post("/listings", 
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
router.get("/:id/edit", 
    listingValidate,
    wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listId = await Listing.findById(id);
     res.render("listing/edit.ejs", {listId});
  }))
  //route for actaully edit form through an put request.
  router.put("/:id", 
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
  router.delete("/:id",
    wrapAsync (async(req, res) => {
    let {id} = req.params;
    let deletedId = await Listing.findByIdAndDelete(id);
    console.log(deletedId);
    res.redirect("/listings")
  }))
  
  //  Reviews :-> post route -> in this route we will create a review for a specific listing and then save it in the database.
  router.post("/:id/reviews", reviewValidate, wrapAsync(async (req, res) => {
    let {rating : newRating, comment : newComment} = req.body;
    let {id} = req.params;
     let listing = await Listing.findById(id);
     let newReview = new Review({
      rating : newRating,
      comment : newComment
     })
  
      listing.reviews.push(newReview);
      await listing.save();
      await newReview.save();
  
      console.log(newReview);
      res.redirect(`/show/list/${req.params.id}`);
  }))
  
  // Delete review [route]
  router.delete("/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let {id, reviewId} = req.params;
    let listing = await Listing.findById(id);
    listing.reviews.pull(reviewId);
    await listing.save();
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/show/list/${req.params.id}`);
  }))
  

  module.exports = router;