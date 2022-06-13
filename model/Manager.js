const mongoose=require('mongoose')
const Schema=mongoose.Schema
const dataSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    auth:{
        type:Boolean,
        default:false
    }

    
})
   // mongoose.model("name",schema) is used to create collection with name : name
module.exports=mongoose.model("Manager",dataSchema)