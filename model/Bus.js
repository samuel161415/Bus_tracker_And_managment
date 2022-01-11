const mongoose=require('mongoose')
const Schema=mongoose.Schema
const dataSchema=new Schema({
    BusType:{
        type:String,
        required:true
    },
    BusId:{
        type:String,
        required:true
    },
    StartingPlace:{
        type:Boolean,
        required:true, 
        default:false
    },
    Destination:{
        type:String,
        required:true
    },
    currentLocation: {
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
      }


})  
   // mongoose.model("name",schema) is used to create collection with name : name
module.exports=mongoose.model("Bus",dataSchema)