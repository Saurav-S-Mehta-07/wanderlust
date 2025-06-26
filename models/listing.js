const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
       type:String,
       default:"https://unsplash.com/photos/a-small-church-on-a-hill-with-mountains-in-the-background-VhY-Wx73iSY",
       set : (v)=> v===""?"https://unsplash.com/photos/a-small-church-on-a-hill-with-mountains-in-the-background-VhY-Wx73iSY": v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;