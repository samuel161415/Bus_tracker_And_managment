const express=require('express')
const router=express.Router()
router.use(express.json())
//const Driver=require('../model/Driver')
const Manager=require('../model/Manager')
const dutyAllocation=require('../model/DutyAllocation')


router.post('/createAcount',async(req,res)=>{ // for creating manager acount
 const value=new Manager({
     UserName:req.body.name,
     UserId:req.body.id
 })
 try{
     const returnvalue=await value.save()
     res.send(returnvalue)
 }
 catch(err){
     res.send("error : "+err)
 }
    
})



router.patch('/dutyAllocation',async(req,res)=>{   // to set daily duty allocation of bus drivers
  
    try{
        const update=await dutyAllocation.updateOne(
               { DriverWorkId: req.body.id },
               { $set: { DailyDutyAllocation: req.body.allocation ,
            //DriverWorkId:req.body.id
        } }, 
                                                                                            
                 { upsert: true }  
            )
            res.send(update)
       
    }
    catch(err){
        res.send('error'+err)
    }
    })
    // Ther also be controlling of bus status 
    module.exports=router