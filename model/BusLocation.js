
const mongoose=require('mongoose')

const schema=mongoose.Schema
const dataSchema=new schema({
busId:{
    type: String,
    required: true
},
latitude:{
    type: Number,
    required: true
},
longitude:{
    type: Number,
    required:true
}
})
module.exports=mongoose.model('BusLocation',dataSchema)