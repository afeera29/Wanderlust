const mongoose= require ("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");
const userSchema= new Schema({
    email:{
        type:String,
        required:true
    },
    //we are defining only email because user and password passport local mongoose will make it by default
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema);