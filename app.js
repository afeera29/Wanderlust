if (process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
//console.log(process.env);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing =require ("./models/listing.js");
//const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
const path= require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema, reviewSchema}=require("./schema.js");
const Review =require ("./models/review.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const session=require("express-session");
const MongoStore= require("connect-mongo");
const flash= require("connect-flash");
const passport=require("passport");
const LocalStrategy= require("passport-local");
const User=require("./models/user.js");
const userRouter=require("./routes/user.js");
 
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// TAKEN from mongoose website and made into double quotes and test renamed into wanderlust
// to connect the database
main().then(() =>{
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
})
//first created this function and then called it above 
async function main(){
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store= MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error",() =>{
    console.log("ERROR in MONGO SESSION STORE",err);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser=req.user;
    next();
});
// app.get("/demouser",async(req,res)=>{
//     let fakeUser= new User({
//         email:"student@gmail.com",
//         username:"deltaa-student"
//     });
//     let registeredUser= await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


//  //let {title,description,image,price,country,location} = req.bod;
//     //above line is one way in which we can extract the info, the other way is to create the name as listing[title] so we make changes to make the names acc
//     //let listing= req.body.listing;//this will give a js object and try to see how it looks at first 
// //GET request to /listings/new that will give a form and after submission of that form 
// //the post request is sent to make a new lsiting on /listings 

// //for update
// //Get request to /listings/:id/edit to get an edit form and submit will give a post request to /listings/:id to update 


// // app.get("/testListing", async (req,res) =>{
// //     let sampleListing = new Listing ({
// //         title:"My New Villa",
// //         description: "By the beach",
// //         price: 1200,
// //         location: " Calangute, Goa",
// //         country: "India",
// //     });

// //     await sampleListing.save();
// //     console.log("sample was saved");
// //     res.send("successful testing");
// // });
// app.all("*",(req,res,next) =>{
//     next(new ExpressError(404, "Page Not Found!"));
// });


// app.use((err, req, res, next) => {
//     let{statusCode=500,message="Something Went Wrong!"} = err;
//     res.status(statusCode).render("error.ejs",{message });
//     //res.status(statusCode).send(message);
// });

app.listen(8080,() => {
    console.log("Server is listening to port 8080");
});
app.get('/', (req, res) => {
  res.redirect('/listings');
});