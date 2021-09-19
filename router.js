const express=require('express');
const router=express.Router();
const multer=require('multer');
const Uploadmodel=require('./model/upload');
const Albummodel=require('./model/album')
const Addphoto=require('./model/add_photo');
const usermodel = require('../React Admin/model/usermodel');
const ImageModel=require('./model/image');
const path=require('path');


        router.get('/upload',(req,res)=>{

            res.render('add_image')
        })
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname));
    }

});
   
  var upload = multer({ storage: Storage,
                        fileFilter:function(req,file,cb)
                        {
                            checkFileType(file,cb)
                        }
}).array('image',10);  

function checkFileType(file,cb)
{
    const fileType=/jpeg|jpg|png|gif/;
    const extname=fileType.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype=fileType.test(file.mimetype);
    if(mimetype && extname)
    {
        cb(null,true)
    }else{
        cb('error:image  only');
    }
}
router.get('/upload',(req,res)=>{
res.render('add_image');
      })
router.post('/upload',(req,res)=>{
  
upload(req,res,(err)=>{

    if(err)
    {
        res.json({err:err});
    }else{
        new Uploadmodel({
    name:req.body.name,
    image:req.files[0].filename
}).save((err,data)=>{
   res.json({message:"upload success"});
})
    }
})

})
 
router.get('/album_name_list',(req,res)=>{

    Uploadmodel.find({},(err,data)=>{
        res.render('album_name_list',{'data':data})
        

    })
})
router.get('/add_photo/:id',(req,res)=>{
    const id=req.params.id;
res.render('add_photo',{'id':id})

})
router.get('/album_list',(req,res)=>{

    Albummodel.find({},(err,data)=>{
        res.render('alubum_list',{'data':data})


    })
})
router.post('/add_photo/:id',(req,res)=>{

var id=req.params.id;
var data=[];

upload(req,res,(err)=>{
  
    if(err)
    {
        res.json({err:err});
    }else{
      for(var i=0;i<req.files.length;i++)
{
    data.push({
        album_image:req.files[i].filename,
        upload_id:id
    })
}

    Albummodel.insertMany(data,(err,data)=>{
        res.json({message:"add photos sucsess fully"})
    })
    }
})




})

router.get('/view_album_list/:id',(req,res)=>{
    var id=req.params.id
    Albummodel.find({'upload_id':id},(err,data)=>{
        res.render('view_alubum_list',{'data':data})
    })
})








module.exports=router;