const req = require('express/lib/request')
const { Int32, Double } = require('mongodb')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const dataSchema=new Schema({
    driverName:{
        type:String,
        required:true
    },
    driverId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    token:{
        type:String
    }
    

})  
   // mongoose.model("name",schema) is used to create collection with name : name
module.exports=mongoose.model("Driver",dataSchema)