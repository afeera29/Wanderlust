const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


// TAKEN from mongoose website and made into double quotes and test renamed into wanderlust
// to connect the database
main().then(() =>{
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
})
//first created this function and then called it above 
async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"682a0cfadc0f7684b984a26b"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();
