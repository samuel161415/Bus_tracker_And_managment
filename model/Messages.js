const mongoose=require('mongoose')
const schema=mongoose.Schema
const dataSchema=new schema({
    date:{
        type: Date,
        required:true,
        default:false
    },
    senderId:{
        type:String,
        reqired:true
    },
    receiverId:{
        type:String,
        requred: true
    }
    ,
    body:{
        type: String,
        required:true,
        default:false
    },
})
module.exports=mongoose.model("Messages",dataSchema)