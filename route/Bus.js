const express=require('express')
const router=express.Router()
const bus=require('../model/Bus')
const BusLocation = require('../model/BusLocation')
router.use(express.json())
const busRoute=require('../model/Route')



router.post("/createAcount",async(req,res)=>{  // creating new bus's Information for first time
    console.log("checked in");
    const value=new bus({
        busName:req.body.busName,
        busId:req.body.busId,
        driverId: req.body.driverId
      })
try{
  const returnValue=await value.save()   // used to save data to database
  res.json(returnValue)
}
catch(error){
res.send('error'+ error)
}
})

router.get("/totalBus",async(req,res)=>{
    
try{
    
const busValue=await bus.find()

const routeValue=await busRoute.find()
const location=await BusLocation.find()
let result={
    bus:busValue,
    routes:routeValue,
    location:location
}

res.json(result)

}
catch(error){
res.send("error"+error)
}
})

router.get("/filteredBus/:destination",async(req,res)=>{
  
      var {destination}=req.params
    
    try{
   
    const routeValue=await busRoute.find({routes:destination})
   
    //busIds.forEach((arr)=>)
    return res.json(routeValue)
    
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
           { busId: req.body.id },
           { $set: { currentLocation: req.body.location } }, // use this format for update or updateOne. 
                                                             //it changes the values in upadate and leaves the other fileds unchanged
             { upsert: true }  // used to insert if the object not found
        )

        res.send(update)
   
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