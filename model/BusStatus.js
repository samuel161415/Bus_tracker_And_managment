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
    state:{
        type:String,
        required:true, 
        default:false
    },
   time:{
    time : { type : Date, default: Date.now }
   }

})  
   // mongoose.model("name",schema) is used to create collection with name : name
module.exports=mongoose.model("BusStatus",dataSchema)