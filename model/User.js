const mongoose=require('mongoose')
const Schema=mongoose.Schema
const dataSchema=new Schema({
   
    UserLocationName:{
        type:String,
        required:true
    },
    UserDestination:{
         type:String,
         required:true
    },
    UsercurrentLocation: {
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
      }


})  
   // mongoose.model("name",schema) is used to create collection with name : name
module.exports=mongoose.model("User",dataSchema)