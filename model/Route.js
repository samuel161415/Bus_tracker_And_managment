
const mongoose=require('mongoose')

const schema=mongoose.Schema
const dataSchema=new schema({
busId:{
    type: String,
    required: true
},
routes:{
    type:Array,
    required:true
}
}
)
module.exports=mongoose.model('Route',dataSchema)