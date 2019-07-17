var mongoose = require("mongoose")
//creating schema of documents where image details saved
var imageSchema = mongoose.Schema({
    fileName:String,
    description:String,
    categeory:String,
    time:String,
    date:String,
    comment:Array,
    like:Array
})

module.exports = mongoose.model('usersimage',imageSchema);
