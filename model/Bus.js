const mongoose=require('mongoose')
const Schema=mongoose.Schema
const dataSchema=new Schema({
    busName:{
        type:String,
        required:true
    },
    busId:{
        type:String,
        required:true
    },
    driverId:{
        type:String,
        required:true, 
        //default:false
    },
    // destination:{
    //     type:String,
    //     required:true
    // },
    // location: {
    //     type:Array,
    //     required:true
    //       //default: 'Point',
        
    //     //coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
    //   }


})  
   // mongoose.model("name",schema) is used to create collection with name : name
module.exports=mongoose.model("Bus",dataSchema)