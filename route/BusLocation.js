const express=require('express')
const router=express.Router()
const BusLocation=require('../model/BusLocation')
router.use(express.json())



router.patch("/insertLocation",async(req,res)=>{  // creating new bus's Information for first time
    // console.log("checked in");
   
      try{
        const update=await BusLocation.updateOne(
               { busId: req.body.busId },
               { $set: { latitude: req.body.latitude ,
                   longitude: req.body.longitude
            } }, // use this format for update or updateOne. 
                                                                 //it changes the values in upadate and leaves the other fileds unchanged
                 { upsert: true }  // used to insert if the object not found
            )
    
            return res.json(update)
       
    }
    catch(err){
        res.send('error'+err)
    }
    })
router.patch('/update',async(req,res)=>{

    try{
        const update=await BusLocation.updateOne(
               { busId: req.body.busId },
               { $set: { latitude: req.body.latitude ,
                   longitude: req.body.longitude
            } }, // use this format for update or updateOne. 
                                                                 //it changes the values in upadate and leaves the other fileds unchanged
                 { upsert: true }  // used to insert if the object not found
            )
    
            res.send(update)
       
    }
    catch(err){
        res.send('error'+err)
    }
    })
    module.exports=router
