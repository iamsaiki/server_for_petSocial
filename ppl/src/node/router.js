var express  = require("express");
var bodyparser = require('body-parser');
var api=require("./userapi");
var multer  = require('multer');

var urlencodedParser = bodyparser.urlencoded({ extended: false });
var router = express.Router();



console.log("Hi from router");

router.use(express.static('public'));



router.post("/adduser",function(req,res){
    var a = req.body;
    var b = res;
    console.log(a);
    api.adduser(a,b,function(err,result){
    if(err)
        console.log(err);
    else
        console.log("add user done");
})
});


router.post("/verifymail", urlencodedParser ,function(req,res){
    var t = req.body.otpverify;
  var u = req.body.email;
  var r = res;
    api.verifymail(r,t,u,function(err,result){
        if(err)
        console.log(err);
        else
        console.log("add user done");
    })
  
})


var luname,lpass;
router.post("/loginpostcall",urlencodedParser,function(req,res){
    console.log("post call ")
luname = req.body.email;
lpass = req.body.password;   r=res;

api.loginpostcall(luname,lpass,r,function(err,result){
    if(err)
    console.log(err);
    else
    console.log("add user done");
})
console.log(luname + " " + lpass);

});

var storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, 'img'+Date.now()+'.jpeg');
    }
})
var upload = multer({ storage: storage });

// handling file upload call
router.post('/upload', upload.single('filename'), function (req, res) {
   // console.log('Details Of Just Uploaded File =>'+JSON.stringify(req.file)+'\n');
   console.log("this is router and upload call",req.file)
    data = {
        filename:req.file.filename,
        description:req.body.description,
        categeory:req.body.category,
        date:req.body.date,
        time:req.body.time
    }
    console.log(data.categeory);
    api.upload(data,(err,result)=> {
        if (err) {
            console.log('This Msg From Router File An Error Occured May File Not Saved In DataBase'+err+'\n');
        }
        else {
            console.log('This Msg From Router File and FileName saved in Database Properly!!! \n');
        }
        api.findImages(data,(err,result)=> {
            if (err) {
                console.log('Msg From Router An Error During Finding File '+err+'\n')
            }
            else
            {
                console.log('Msg From Router File Total FileNames In DataBase Are =>'+result.length+'\n');
                res.send(result);
            }
        })
    })
})

// handling retrive call
router.post('/retrive',(req,res)=>{
    api.findImages({},(err,result)=> {
        
        if (err) {
            console.log('Msg From Router :An Error During Finding File '+err+'\n')
        }
        else
        {
            console.log('Msg From Router File :Total FileNames In DataBase For LoggedIn Are =>'+result.length+'\n');
            console.log(result)
            res.send(result);
             
        }
    })
})

//handling category save
router.post('/save_categeory', upload.single('categeory_image'), function (req, res) {
    console.log("this is save categeory call")
    console.log('Details Of Just Uploaded File Of Categeory =>'+JSON.stringify(req.body.categeory)+'\n');
    data = {
        filename:req.file.filename,
        categeory:req.body.categeory
    }
    console.log("")
    api.save_categeory(data,(err,result)=> {
        if (err) {
            console.log('This Msg From Router File An Error Occured May FileName Of Categeory image Not Saved In DataBase'+err+'\n');
        }
        else {
            console.log('This Msg From Router File and FileName Of Categeory saved in Database Properly!!! \n');
        }
        api.findCategories(data,(err,result)=> {
            if (err) {
                console.log('Msg From Router An Error During Finding File '+err+'\n')
            }
            else
            {
                console.log('Msg From Router File Total FileNames In DataBase Are =>'+result.length+'\n');
                console.log(result)
                res.send(result);
            }
        })

    })
})

router.post('/findsave_categeory',(req,res)=>{
    api.findCategories({},(err,result)=> {
        if (err) {
            console.log('Msg From Router An Error During Finding File '+err+'\n')
        }
        else
        {
            console.log('Msg From Router File Total FileNames In DataBase Are =>'+result.length+'\n');
            console.log(result)
            res.send(result);
        }
    })
})

router.post('/singalpost',(req,res)=>{
    imgname = req.body.l;
    console.log(imgname)
    api.findsingalpost(imgname,(err,result)=>{
        if (err) {
            console.log('Msg From Router An Error During Finding File '+err+'\n')
        }
        else
        {
            console.log('Msg From Router singalpost=>'+result.length+'\n');
            console.log(result)
            res.send(result);
        }
    })
})

//comment section
router.post('/comment',(req,res)=>{

   imgname = req.body.a;
   newcomment = req.body.b;
   console.log(req.body.b)
   api.comment(imgname,newcomment,(err,result)=>{
        if(err)
        console.log('Msg From Router An Error During Finding File '+err+'\n')
        else{
            console.log("router comment - resulet");
           
    api.commentsend(imgname,(err,result)=>{
        if(err)
        console.log('Msg From Router An Error During Finding File '+err+'\n')
        else{
            console.log("router comment - resulet");
            res.send(result);
        }
    })
        }
})

})

//fetchcomment
router.post('/fetchcomment',(req,res)=>{

    imgname = req.body.a;
    console.log(imgname + "inrouter fechcomment")
     api.commentsend(imgname,(err,result)=>{
         if(err)
         console.log('Msg From Router An Error During Finding File '+err+'\n')
         else{
             console.log("router fetchcomment - result" + result);
             res.send(result);
         }
     })
   })



   router.post('/like',(req,res)=>{
    imgname = req.body.a;
    email=req.body.b;
    console.log(imgname)
    api.like(imgname,email,(err,result)=>{
         if(err)
         console.log('Msg From Router like  '+err+'\n')
         else{
             console.log("router comment - resulet");

 api.likesend(imgname,email,(err,result)=>{
    console.log("dsajf;kdafjjdsajdsaljdslkdfjslkkdfsajdsa;dfsalk")
    if(err)
    console.log('Msg From Router like fetch '+err+'\n')
    else{
        console.log("router like - result",result);
        res.send(result);
    }
})
     }
 })
 })




module.exports = router;