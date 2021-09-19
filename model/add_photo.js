const mongoose=require('mongoose');
const add_photomodel=mongoose.Schema({

    add_photo:{
        type:String
    },
    fruit_id:{
type:String
    },
    upload_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"upload"
    }


})
module.exports=mongoose.model('addphotos',add_photomodel);
