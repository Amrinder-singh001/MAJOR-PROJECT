const express = require("express");
const router = express.Router({mergeParams : true});
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const CustomError = require("../utils/CustomError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");


// Function reviewValidate is a middleware function that validates the request body against the reviewSchema using Joi. If there is an error in validation, it throws a CustomError with a status code of 400 and the error message. If there is no error, it calls the next middleware function in the stack.
const reviewValidate = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    console.log(error);
  
    if (error) {
      throw new CustomError(400, error.message);
  }else{
      next();
  }}



  //  Reviews :-> post route -> in this route we will create a review for a specific listing and then save it in the database.
  router.post("/", reviewValidate, wrapAsync(async (req, res) => {
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
      console.log(id);
      res.redirect(`/listings/${req.params.id}`);
  }))
  
  // Delete review [route]
  router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let {id, reviewId} = req.params;
    let listing = await Listing.findById(id);
    listing.reviews.pull(reviewId);
    await listing.save();
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${req.params.id}`);
  }))

  module.exports = router;