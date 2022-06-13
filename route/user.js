const express=require("express")
const router=express.Router()
let User=require('../model/User')
router.use(express.json())

router.post("/createAcount",async(req,res)=>{
    const result=new User({
        latitude:req.body.latitude,
        longitude:req.body.longitude,
    }
    )
    try{
      const returnValue=await result.save()
      res.send(returnValue)
    }
    catch(err){
        res.send(err);
    }
})


router.get("/:Username",async(req,res)=>{
    const{Username}=req.params
try{
const returnvalue=await Userdata.findOne({"Username":Username})

res.json(returnvalue)

}
catch(error){
res.send("error"+error)
}
})

// router.patch('/update',async(req,res)=>{
// try{
//    const update=await Userdata.findOne({
//        "Username":req.query.name,
//        "UserPassword":req.query.password
//    })
  
//    update.Username=req.body.name
  
//    update.UserPassword=req.body.password
//    const returnVaue=await update.save()
//    res.json(returnVaue)
// }
// catch(err){
//     res.send('error'+err)
// }
// })
// router.post("/createAcount",async(req,res)=>{  // creating new username's acount
//     const value=new Userdata({
//         Username:req.body.name,
//         UserPassword:req.body.password,
        
//       })
// try{
//   const returnVaue=await value.save()   // used to save data to database
//   res.json(returnVaue)
// }
// catch(error){
// res.send('error'+ error)
// }
// })

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