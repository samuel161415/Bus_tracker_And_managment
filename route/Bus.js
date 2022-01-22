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
  const returnValue=await value.save()   // used to save data to database
  res.json(returnValue)
}
catch(error){
res.send('error'+ error)
}
})

router.get("/TotalBus",async(req,res)=>{
    
try{
    // const id=req.params.id
    // console.log('id is '+id)
const returnvalue=await bus.find()
res.json(returnvalue)

}
catch(error){
res.send("error"+error)
}
})

router.get("/FilteredBus/:destination",async(req,res)=>{
      var {destination}=req.params
    try{
        // const id=req.params.id
        // console.log('id is '+id)
    const returnvalue=await bus.find({Destination:destination})
    res.json(returnvalue)
    
    }
    catch(error){
    res.send("error"+error)
    }
    })
    
// router.get('/bus',(req,res)=>{
//     res.send('success')
// })

router.patch('/update',async(req,res)=>{

try{
    const update=await bus.updateOne(
           { BusId: req.body.id },
           { $set: { currentLocation: req.body.location } }, // use this format for update or updateOne. 
                                                                                        //it changes the values in upadate and leaves the other fileds unchanged
             { upsert: true }  // used to insert if the object not found
        )
   
}
catch(err){
    res.send('error'+err)
}
})


router.delete('/deleteAcount/:id',async(req,res)=>{     // deleting username's acount
    try{
        const{id}=req.params
       const update=await Userdata.findOne({BusId:id,
    })
       
       const returnVaue=await update.remove()
       res.json(returnVaue)
    }
    catch(err){
        res.send('error'+err)
    }
    })

module.exports=router