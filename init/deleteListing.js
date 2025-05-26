const mongoose = require("mongoose");
const Listing = require("../models/listing");

mongoose.connect("mongodb+srv://afeerafirdoose29:firdoose2901@cluster0.tici6hk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected");
    return Listing.deleteMany({});
  })
  .then(() => {
    console.log("All listings deleted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log("Error:", err);
    mongoose.connection.close();
  });
