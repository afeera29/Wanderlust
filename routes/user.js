const express = require("express");
const router= express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/users.js");
router.get("/signup",(userController.renderSignupForm));
router.post("/signup",
    wrapAsync(userController.signup)
);
router.get("/login",userController.renderLoginForm);
router.post("/login",saveRedirectUrl,passport.authenticate("local",
    {failureRedirect: "/login",
        failureFlash:true,
    }),userController.login
    );
router.get("/logout",userController.logout);

module.exports=router;
// so like in listing.js the routes whihc are same can be combined together for code 
//modularity and can be written in a comoact form for this file also 