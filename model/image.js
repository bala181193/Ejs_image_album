const mongoose=require('mongoose');
const imagemodel=mongoose.Schema({

    image:{
        type:String
    }
})
module.exports=mongoose.model('multiple_images',imagemodel);