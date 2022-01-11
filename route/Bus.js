const express=require('express')
const router=express.Router()
const bus=require('../model/Bus')
router.use(express.json())



router.post("/createAcount",async(req,res)=>{  // creating new bus's Information for first time
    const value=new bus({
        BusType:req.body.busname,
        BusId:req.body.id,
        StartingPlace:req.body.startingPlace,
        Destination:req.body.BusDestination,
        currentLocation:req.body.location
        
      })
try{
  const returnVaue=await value.save()   // used to save data to database
  res.json(returnVaue)
}
catch(error){
res.send('error'+ error)
}
})

router.get("/:id",async(req,res)=>{
    const id=req.params.id
try{
const returnvalue=await bus.findOne({BusId:id})

res.json(returnvalue)

}
catch(error){
res.send("error"+error)
}
})

router.patch('/update',async(req,res)=>{

try{
    const update=await bus.updateOne(
           { BusId: req.body.id },
           { $set: { currentLocation: req.body.location } }, // use this format for update or updateOne. 
                                                                                        //it changes the values in upadate and leaves the other fileds unchanged
             { upsert: true }  // used to insert if the object not found
        )
   
   const returnVaue=await update.save()
   res.json(returnVaue)
}
catch(err){
    res.send('error'+err)
}
})


// router.delete('/deleteAcount',async(req,res)=>{     // deleting username's acount
//     try{
//        const update=await Userdata.findOne({"Username":req.body.name,
//     "UserPassword":req.body.password})
       
//        const returnVaue=await update.remove()
//        res.json(returnVaue)
//     }
//     catch(err){
//         res.send('error'+err)
//     }
//     })

module.exports=router