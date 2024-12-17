const mongoose=require('mongoose');

const managerSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    phoneNo:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        
    },
    gender:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
})

const URL=mongoose.model('manager',managerSchema);

module.exports=URL;