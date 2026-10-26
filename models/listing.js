// for listing models

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new mongoose.Schema({
     title: {
        type : String,
        required : true,
        runValidators : true,
    },
     description: {
        type : String, 
        required : true,
        runValidators : true,
     },
     image: {
        type : String,
        default : "https://a0.muscache.com/im/pictures/hosting/Hosting-1689725012866849102/original/540d911e-e58c-4cda-a54e-2ff45170af7d.png?im_w=720",
        set : (v) =>
             v === " " ? "https://a0.muscache.com/im/pictures/hosting/Hosting-1689725012866849102/original/540d911e-e58c-4cda-a54e-2ff45170af7d.png?im_w=720"
             : v,
        runValidators : true,
     },
     price: { 
        type : Number,
        required : true,
        runValidators : true,
     }, 
     location: {
        type : String,
        required : true,
        runValidators : true,
     },
     country: {
        type : String,
        required : true,
        runValidators : true,
     }
})

const Listing = new mongoose.model("Listing", listingSchema);
module.exports = Listing;