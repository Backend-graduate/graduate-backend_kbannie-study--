const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:50,
        required: true
        },
    password:{ 
        type:String,
        maxlength:200,
        required: true
        },
    age:{
        type:Number,
    }
})

const User=mongoose.model('User',userSchema);
module.exports={User};