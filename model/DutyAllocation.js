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
     DriverWorkId:{
         type:String,
         required:true,
         default:false
     },
     DailyDutyAllocation:{
         type:String,
         required:true,
       
     }
 })
 module.exports=mongoose.model('DutyAllocation',DutyAllocationData)