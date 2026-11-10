const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating :{
        type : Number,
        max : 5,
        min : 1
    },
    
    comment : String,

    created_at : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Review", reviewSchema);