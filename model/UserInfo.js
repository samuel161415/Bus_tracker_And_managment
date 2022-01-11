
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const dataSchema=new Schema({
Username:{
    type:String,
    required:true
},
UserPassword:{
    type:String,
    required:true
},
})  
// mongoose.model("name",schema) is used to create collection with name : name
module.exports=mongoose.model("UserInfo",dataSchema)