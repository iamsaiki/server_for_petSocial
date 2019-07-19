var nodemailer = require("nodemailer");
var userDb = require("./schema");
var imageSchema = require("./imageSchema");
var categeorySchema = require("./categorySchema");
var fname,lname,uname,pass;
var a=0,b=0,c=0,d=0;
var data = userDb;


module.exports = {


adduser: function(d,c,cb){
fname =d.firstname;
lname = d.lastname;
uname = d.userName;
pass = d.password;
eMail = d.email;

var n = Math.floor(Math.random() * 100000);
console.log(n);
console.log(fname + lname + uname+ pass);
var userdata = new data({firstname:fname,lastname:lname,
  userName:uname,password:pass,otp:n,isverfied:false,email:eMail});
data.find({email:eMail},function(err,doc){
  if(err)
  console.log("OOPS ERROR OCCURED");
  else{
    if(doc.length>0)
    {
      query="OOPS Email already exists",
      c.send(query);
      console.log("Email already exists");
    }
    else{
      userdata.save((err,userdata)=>{
          if(err)
          console.log("not saved");
          else
          console.log("saved")
        });
        c.send("Done" );
    }
}
})

    
},
verifymail:function(r,t,u,cb){  
  data.find({otp:t,username:u},function(err,docu){
    if(err)
    console.log(err);
    else
    {
      if(docu.length>0){
      r.send("verified");
      data.updateOne({otp:t},{isverfied:true},function(err,udoc){
          if(err)
          console.log(err);
      });
    }
      else
      r.send("wrong otp");
    }

  })
},





   
// handling uploading file
upload: function(data,cb) {
  imageSchema.create({fileName:data.filename,description:data.description,categeory:data.categeory,date:data.date,time:data.time},(err,result)=>{
      if(err){
          console.log('Error In Userapi File During Saving FileName '+err+'\n');
          return cb(err,null);
      }
      else{
          console.log('File Name Saving Process In Userapi File Completed !!'+'\n');
          console.log(result)
          return cb(null,result);
      }
  })
},

// handling finding image process
findImages:function(data,cb) {
  imageSchema.find({},(err,result)=> {
      if(err) {
          console.log('Error in user api during finding images '+err+'\n');
          return cb(err,null);
      }
      else {
          console.log('Image Finding Done In Userapi File '+'\n');
          return cb(null,result);
      }
  })
},

save_categeory: function(data,cb) {
  categeorySchema.create({fileName:data.filename,categeory:data.categeory},(err,result)=>{
      if(err){
          console.log('Error In Userapi File During Saving FileName Of Categeory Image '+err+'\n');
          return cb(err,null);
      }
      else{
          console.log('FileName Of Categeory Image Saving Process In Userapi File Completed !!'+'\n');
          return cb(null,result);
      }
  })
},

//finding categeory
findCategories:function(data,cb) {
  categeorySchema.find({},(err,result)=> {
      if(err) {
          console.log('Error in user api during finding images '+err+'\n');
          return cb(err,null);
      }
      else {
          console.log('Image Finding Done In Userapi File '+'\n');
          return cb(null,result);
      }
  })
},

//finding singal post
findsingalpost:function(imgname,cb){
  console.log("this is imgname"+imgname)
  imageSchema.find({fileName:imgname},(err,result)=>{
  if(err){
    console.log("errorn in userapi during findsingalpost"+err)
    return cb(err,null);
  }
  else{
    console.log("done in userapi singal post")
    console.log(result)
    return cb(null,result);
  }

  })
},

//comment section
comment:function(imgname,newcomment,cb){
  console.log(imgname +" 123 "+newcomment)
  imageSchema.update(
    { "fileName": imgname},
    { "$push": { "comment": newcomment} },(err,result)=>{
     if(err)
     console.log("userapi err in comment " + err)
     else{
       console.log("userapi done comment" +result )
       return cb(null,result)
     }
    })
},

//sending comment 
commentsend:function(imgname,cb){
  imageSchema.find({fileName:imgname},(err,result)=>{
    if(err){
      console.log("errorn in userapi during findsingalpost"+err)
      return cb(err,null);
    }
    else{
      console.log("done in userapi sending comment")
     
      return cb(null,result);
    }
  
    })
},


//like section
like:function(imgname,email,cb){
imageSchema.find(
{ "fileName": imgname, "like":email },(err,result)=>{
if(err)
console.log(err)
else{
console.log("")
if(result.length>0){
imageSchema.updateOne({"fileName":imgname},
{"$pull": {"like":email} }, (err,result)=>{
console.log("pulling email from like array")
console.log(result)
if(err)
console.log(err)
else 
return cb(null,result);
}) 
}
else{
imageSchema.updateOne({ "fileName": imgname },
{ "$push": { "like": email} },(err,result)=>{
console.log("pushing into array")
console.log(result)
if(err)
console.log(err)
else 
return cb(null,result);
})
}
}
})
},

//like sending
likesend:function(imgname,email,cb){
  console.log("dfasssssssssssssssssssssssssssssssss")
  imageSchema.find(
    { "fileName": imgname},{ "like":1},(err,result)=>{
      if(err)
      console.log(err)
      else{
        console.log("this is result",result)
          return cb(null,result)
      }
    })
},

loginpostcall:function(luname,lpass,r,cb)
{
  console.log(luname,lpass)
data.find({email:luname},function(err,ldoc){
    if(err)
    console.log(err);
    else{
      if(ldoc.length>0){
      c++;
    }
      else{
        a++;
     
      }
    }
    });
    data.find({password:lpass},function(err,lpdoc){
      if(err)
      console.log(err);
      else{
        if(lpdoc.length>0)
        d++;
        else{
          b++;
        }
      }
      console.log(a +" "+ b + " " + c + " " + d);
      if(a>=1 && b>=1){a=0;b=0;
        r.send("Logged in Successfully");
      }
        else if(a>=1 && b==0){
          a=0;b=0;
        r.send("username  incorrect");
      }
        else if(a==0 && b>=1)
        {
          a=0;b=0;
          r.send("password incorrect");
        }
        else {a=0;b=0;
          
          r.send(luname);
          console.log(luname)
        }
        console.log(a +" "+ b + " " + c + " " + d);
      });
    
}

}
