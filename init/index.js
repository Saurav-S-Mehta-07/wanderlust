const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(() => {
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:'686ccfdec6b7f2b24c3fcd5f'}));
    await Listing.insertMany(initData.data); 
    console.log("data was initialized");
}

initDB();
