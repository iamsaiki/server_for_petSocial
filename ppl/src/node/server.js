var express = require("express");
var app  = express();
const cors = require('cors');
var mongoose = require("mongoose");
var router = require('./router');
var bodyparser = require('body-parser');

 
app.use(cors());
app.use(express.static('uploads'));

app.use (bodyparser.urlencoded({extended:false}));
app.use (bodyparser.json());
app.use("/",router);

mongoose.connect("mongodb://localhost:27017/myapp",
{useNewUrlParser: true },(err)=>{
if(err)
console.log(err)
else
console.log("Mongo connected");
});

router.get('/', function (req, res) {
    res.redirect("http://localhost:3000");
 })
app.listen(8000,()=>{
    console.log("Let's Roll")
});

