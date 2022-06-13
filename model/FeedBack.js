const mongoose=require('mongoose')
const schema=mongoose.Schema
const dataSchema=new schema({
    date:{
        type: Date,
        required:true,
        default:false
    },
    
    body:{
        type: String,
        required:true,
        default:false
    },
})
module.exports=mongoose.model("FeedBack",dataSchema)