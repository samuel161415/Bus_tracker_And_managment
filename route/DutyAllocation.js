const express=require('express')
const router=express.Router()
const dutyAllocation=require('../model/DutyAllocation')
router.use(express.json())
const Bus= require('../model/Bus')


router.post("/createTask",async(req,res)=>{  // creating new bus's Information for first time
    console.log("checked in");
    const value=new dutyAllocation({
        driverId:req.body.driverId,
        busId:req.body.busId,
        date:req.body.date
      })
try{
  await value.save()   // used to save data to database
  res.json(true)
}
catch(error){
res.send(false)
}
})

  

    module.exports=router
