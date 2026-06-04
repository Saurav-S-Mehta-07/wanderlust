const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
});

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connection successful");
    initDB();
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    const data = initData.data.map((obj) => ({
      ...obj,
      owner: "6a21891962f8f0ae2c8a2300",
    }));

    await Listing.insertMany(data);

    console.log("Data was initialized");
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};
