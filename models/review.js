const { object } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment : String,
    rating : {
        type : Number,
        min : 1,
        max : 5,
    },
    created_at : {
        type : Date,
        default : Date.now(),
    },
    author : {
        type : Schema.Types,object,
        ref: "User"
    },
});

const Review = mongoose.model("review",reviewSchema);

module.exports = Review;