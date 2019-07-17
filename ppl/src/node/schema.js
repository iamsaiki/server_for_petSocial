var mongoose  = require("mongoose")
var userSchema = mongoose.Schema({

    firstname : String,
    lastname : String,
    userName : String,
    password : String,
    email:String,
    otp:Number,
    isverfied:Boolean,

})
var userDb = mongoose.model("user",userSchema)

module.exports = userDb;
