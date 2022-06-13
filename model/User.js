const { Double } = require('mongodb')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const dataSchema=new Schema({
   
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
         type:Number,
         required:true
    },
    // UsercurrentLocation: {
    //     type: {
    //       type: String,
    //       default: 'Point',
    //     },
    //     coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
    //   }


})  
   // mongoose.model("name",schema) is used to create collection with name : name
module.exports=mongoose.model("User",dataSchema)