var mongoose = require("mongoose")
//creating schema of documents where image details saved
var categeorySchema = mongoose.Schema({
    fileName:String,
    categeory:String
})

//exporting modules for use everywhere
module.exports = mongoose.model('userscategeory',categeorySchema);