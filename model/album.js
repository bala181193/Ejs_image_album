const mongoose=require('mongoose');
const albummodel=mongoose.Schema({

    album_image:{
        type:String
    },
    upload_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"uploads"
    }

})
module.exports=mongoose.model('albums',albummodel);
