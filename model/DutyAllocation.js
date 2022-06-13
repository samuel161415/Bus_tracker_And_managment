const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')

const Schema=mongoose.Schema
 const  DutyAllocationData=new Schema({
    //  DriverName:{
    //      type:String,
    //      required:true,
    //      default:false

    //  },
     driverId:{
         type:String,
         required:true,
         
     },
     busId:{
         type:String,
         required: true
     },
     date:{
         type:Date,
         required:true
     }
     
    
   
   

 })
 module.exports=mongoose.model('DutyAllocation',DutyAllocationData)